defmodule Teebox.Authentication.OmniAuthLogin do
  alias Teebox.Accounts.User
  alias Ueberauth.Auth

  @user_repo Application.get_env(:teebox, :user_repo)
  @services ~w(facebook google)a

  def call(%Auth{} = auth) do
    find_user_by_provider_and_uid(auth) |> update_or_create_user(auth)
  end
  def call(_), do: {:error, "Invalid Omniauth hash provided"}

  defp find_user_by_provider_and_uid(auth) do
    @user_repo.find_by_provider_and_uid(auth.provider, auth.uid)
  end

  defp update_or_create_user(existing_user, %{provider: service} = auth) when service in @services do
    update_or_create_user_from_auth(existing_user, auth)
  end
  defp update_or_create_user(_, auth), do: {:error, "Unsupported provider #{auth.provider}"}

  defp update_or_create_user_from_auth(existing_user, auth) do
    generate_user_changeset_from_auth(existing_user, auth)
      |> add_user_id(existing_user)
      |> @user_repo.insert_or_update()
  end

  defp generate_user_changeset_from_auth(existing_user, auth) do
    user_struct = get_user_struct(existing_user)

    User.create_changeset(user_struct, %{
      uid: auth.uid,
      name: name_from_auth(auth),
      email: auth.info.email,
      avatar: auth.info.image,
      provider: to_string(auth.provider),
      password: Ecto.UUID.generate(),
    })
  end

  defp get_user_struct(%User{} = existing_user), do: existing_user
  defp get_user_struct(_), do: %User{}

  defp name_from_auth(auth) do
    if auth.info.name do
      auth.info.name
    else
      [auth.info.first_name, auth.info.last_name]
        |> Enum.filter(&(&1 != nil and String.trim(&1) != ""))
        |> Enum.join(" ")
    end
  end

  defp add_user_id(changeset, %User{} = user), do: Map.merge(changeset, %{id: user.id})
  defp add_user_id(changeset, _), do: changeset
end
