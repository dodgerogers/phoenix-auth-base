defmodule Teebox.Accounts.Registration do
  alias Teebox.Accounts.Message
  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.Repositories.UsersRepository

  def call(%{} = params) do
    with {:ok, user} <- register_user(params) do
      send_confirmation(user)
      {:ok, user}
    else
      {:error, msg} -> {:error, msg}
    end
  end

  defp register_user(%{} = params) do
    User.changeset(:registration, %User{}, params)
    |> UsersRepository.create()
  end

  defp send_confirmation(%User{} = user) do
    Message.confirm_request(user)
    |> Teebox.Mailer.deliver_now
  end
end
