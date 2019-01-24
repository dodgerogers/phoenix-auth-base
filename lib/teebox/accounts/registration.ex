defmodule Teebox.Accounts.Registration do
  alias Teebox.Accounts.Message
  alias Teebox.Accounts.Schemas.{User, Profile}

  def call(%{} = params) do
    Ecto.Multi.new()
    |> Ecto.Multi.run(:create_user, fn %{} -> create_user(params) end)
    |> Ecto.Multi.run(:create_profile, fn %{create_user: user} -> create_profile(user, params) end)
    |> Teebox.Repo.transaction()
    |> handle_result()
  end

  defp create_user(%{} = params) do
    user_params = Map.take(params, [:email, :password, :password_confirmation])

    User.changeset(:registration, %User{}, user_params)
    |> Teebox.Repo.insert()
  end

  defp create_profile(%User{} = user, %{} = params) do
    profile_params = %{user_id: user.id, name: params.name}

    Profile.changeset(%Profile{}, profile_params)
    |> Teebox.Repo.insert()
  end

  defp send_confirmation(%User{} = user) do
    Message.confirm_request(user)
    |> Teebox.Mailer.deliver_now()
  end

  defp handle_result(result) do
    with {:ok, %{create_user: user}} <- result do
      send_confirmation(user)
      {:ok, user}
    else
      {:error, _process_name, message, _results} -> {:error, message}
      {:error, %Ecto.Changeset{} = changset} -> {:error, changset}
      _ -> {:error, "Something went wrong"}
    end
  end
end
