defmodule Teebox.Accounts.ResetPassword do
  use Teebox.Web, :model

  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.Repositories.UsersRepository
  alias Teebox.Accounts.Services.Password
  alias Teebox.Services.TimeUtil

  @token_expiry_in_secs Application.get_env(:teebox, :reset_password_token_expiry)

  def call(%{"email" => email, "reset_password_token" => token, "password" => _, "password_confirmation" => _} = params) do
    with {:ok, user} <- find_user_by_password_reset_token(email, token),
         {:ok} <- reset_password_token_is_valid?(user),
         {:ok, _updated_user} <- reset_password(user, params)
     do
      {:ok}
    else
      {:error, message} -> {:error, message}
    end
  end
  def call(_), do: {:error, "Invalid arguments"}

  defp find_user_by_password_reset_token(email, token) do
    with %User{} = user <- UsersRepository.find_by_password_reset(email, token) do
      {:ok, user}
    else
      _ -> {:error, "Could not find account"}
    end
  end

  defp reset_password_token_is_valid?(%User{} = user) do
    expiry_in_mins = round(@token_expiry_in_secs / 60)
    if TimeUtil.expired?(user.reset_password_sent_at, expiry_in_mins) do
      {:ok}
    else
      {:error, "Password reset token has expired"}
    end
  end

  defp reset_password(%User{} = user, %{} = params) do
    Password.changeset(user, Map.take(params, ["password", "password_confirmation"]))
    |> UsersRepository.update()
  end
end
