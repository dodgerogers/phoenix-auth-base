defmodule Teebox.Accounts.Registration do
  alias Teebox.Accounts.User
  alias Teebox.Persistance.UsersRepository
  alias Teebox.Accounts.Message

  def call(%{} = params) do
    with {:ok, user} <- create_user(params) do
      send_confirmation(user)
      {:ok, user}
    else
      {:error, msg} -> {:error, msg}
    end
  end

  defp create_user(%{} = params) do
    User.changeset(:registration, %User{}, params)
    |> UsersRepository.create()
  end

  defp send_confirmation(%User{} = user) do
    Message.confirm_request(user)
    |> Teebox.Mailer.deliver_now
  end
end
