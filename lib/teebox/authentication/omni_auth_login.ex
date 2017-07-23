defmodule Teebox.Authentication.OmniAuthLogin do
  alias Teebox.User
  alias Ueberauth.Auth

  @repo Application.get_env(:teebox, :user_repo)
  @services ~w(facebook google)a

  def call(%Auth{} = auth) do
    find_user_by_provider_and_uid(auth) |> update_or_create_user(auth)
  end
  def call(_), do: {:error, "Invalid Omniauth hash provided"}

  defp find_user_by_provider_and_uid(auth) do
    @repo.find_by_provider_and_uid(auth.provider, auth.uid)
  end

  defp update_or_create_user(existing_user, %{provider: :identity} = auth) do
    validate_password(auth) |> handle_identity(existing_user, auth)
  end
  defp update_or_create_user(existing_user, %{provider: service} = auth) when service in @services do
    update_or_create_user_from_auth(existing_user, auth)
  end
  defp update_or_create_user(_, auth), do: {:error, "Unsupported provider #{auth.provider}"}

  defp handle_identity(:ok, existing_user, auth), do: update_or_create_user_from_auth(existing_user, auth)
  defp handle_identity({:error, _} = errors, _, _), do: errors

  defp update_or_create_user_from_auth(existing_user, auth) do
    generate_user_changeset_from_auth(existing_user, auth)
      |> add_user_id(existing_user)
      |> @repo.insert_or_update()
  end

  defp generate_user_changeset_from_auth(existing_user, auth) do
    password = password_from_auth(auth)
    user_struct = get_user_struct(existing_user)

    User.changeset(user_struct, %{
      uid: auth.uid,
      name: name_from_auth(auth),
      email: auth.info.email,
      avatar: auth.info.image,
      provider: to_string(auth.provider),
      token: token_from_auth(auth),
      refresh_token: auth.credentials.refresh_token,
      expires_at: auth.credentials.expires_at,
      password_hash: Comeonin.Pbkdf2.hashpwsalt(password),
    })
  end

  defp get_user_struct(%User{} = existing_user), do: existing_user
  defp get_user_struct(_), do: %User{}

  defp name_from_auth(auth) do
    if auth.info.name do
      auth.info.name
    else
      [auth.info.first_name, auth.info.last_name]
        |> Enum.filter(&(&1 != nil and String.strip(&1) != ""))
        |> Enum.join(" ")
    end
  end

  defp add_user_id(changeset, %User{} = user), do: Map.merge(changeset, %{id: user.id})
  defp add_user_id(changeset, _), do: changeset

  defp validate_password(%{credentials: %{other: %{password: ""}}}), do: {:error, "Password required"}
  defp validate_password(%{credentials: %{other: %{password: pw, password_confirmation: pw}}}), do: :ok
  defp validate_password(%{credentials: %{other: %{password: _}}}), do: {:error, "Passwords do not match"}
  defp validate_password(_), do: {:error, "Password Required"}

  defp token_from_auth(%{provider: :identity}), do: Ecto.UUID.generate()
  defp token_from_auth(%{provider: service} = auth) when service in @services do
    auth.credentials.token
  end
  defp token_from_auth(_), do: nil

  defp password_from_auth(%{provider: :identity} = auth), do: auth.credentials.other.password
  defp password_from_auth(_), do: Ecto.UUID.generate()
end
