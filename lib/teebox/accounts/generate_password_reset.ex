defmodule Teebox.Accounts.GeneratePasswordReset do
  use Teebox.Web, :model

  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.Repositories.UsersRepository
  alias Teebox.Services.StringUtil

  @success_message "A password reset email has been sent"

  def call(%{"email" => email}) do
    with %User{} = user <- UsersRepository.find_by_email(email),
         {:ok, reset_user} <- set_password_reset(user),
         _ <- send_password_reset_token_email(reset_user)
     do
      render_result()
    else
      _ -> render_result()
    end
  end
  def call(_), do: {:error, "Invalid arguments"}

  defp set_password_reset(%User{} = user) do
    changeset(user)
    |> UsersRepository.update()
  end

  def changeset(%User{} = user) do
    user
    |> cast(%{}, [:reset_password_token, :reset_password_token])
    |> change(%{reset_password_sent_at: NaiveDateTime.utc_now()})
    |> change(%{reset_password_token: StringUtil.random_string()})
    |> unique_constraint(:reset_password_token)
  end

  def send_password_reset_token_email(user) do
    Teebox.Accounts.Message.reset_password(user)
    |> Teebox.Mailer.deliver_now
  end

  defp render_result(), do: {:ok, @success_message}
end
