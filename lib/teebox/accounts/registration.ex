defmodule Teebox.Accounts.Registration do
  alias Teebox.Accounts.User
  alias Teebox.Accounts.Message

  @user_repo Application.get_env(:teebox, :user_repo)

  def call(%{} = params) do
    with {:ok, user} <- create_user(params) do
      send_confirmation(user)
      {:ok, user}
    else
      {:error, msg} -> {:error, msg}
    end
  end

  defp create_user(%{} = params) do
    changeset = User.changeset(:registration, %User{}, params)

    with true <- changeset.valid? do
      @user_repo.create(changeset)
    else
      _ -> {:error, changeset}
    end
  end

  defp send_confirmation(%User{} = user) do
    Message.confirm_request(user)
  end
end
