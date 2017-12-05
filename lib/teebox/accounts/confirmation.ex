defmodule Teebox.Accounts.Confirmation do
  alias Teebox.Accounts.User

  @user_repo Application.get_env(:teebox, :user_repo)
  @token_expiry_in_mins 10
  @account_not_found "Could not find account"
  @confirmation_sent "If an account exists we have sent a confirmation code"

  def confirm!(%{"email" => _, "confirmation_token" => _} = params) do
    with {:ok, user} <- find_user_by_token(params),
         {:ok} <- user_not_confirmed?(user),
         {:ok} <- valid_confirmation_token?(user),
         {:ok, _confirmed_user} <- confirm_user(user)
    do
      {:ok, "Your account has been confirmed!"}
    else
      {_, err} -> {:error, err}
    end
  end
  def confirm!(_), do: {:error, "Invalid arguments"}

  defp find_user_by_token(%{"email" => email, "confirmation_token" => token}) do
    with %User{} = user <- @user_repo.find_by_confirmation(email, token) do
      {:ok, user}
    else
      _ -> {:error, @account_not_found}
    end
  end

  defp user_not_confirmed?(%User{} = user) do
    if !confirmed?(user) do
      {:ok}
    else
      {:already_confirmed, "Account is already confirmed"}
    end
  end

  def confirmed?(%User{} = user) do
    user.confirmed_at && !user.confirmation_token && !user.confirmation_sent_at
  end

  defp valid_confirmation_token?(%User{} = user) do
    token_expiry_time = Timex.shift(user.confirmation_sent_at, [minutes: @token_expiry_in_mins])
    if Timex.before?(Timex.now, token_expiry_time) do
      {:ok}
    else
      {:error, "Confirmation token has expired"}
    end
  end

  defp confirm_user(%User{} = user) do
    User.changeset(:confirm, user) |> @user_repo.update()
  end

  def resend_confirmation(%{"email" => _} = params) do
    with {:ok, user} <- find_user_by_email(params),
         {:ok} <- user_not_confirmed?(user),
         {:ok, updated_user} <- reset_confirmation_token(user),
         _ <- Teebox.Accounts.Message.confirm_request(updated_user)
    do
      {:ok, @confirmation_sent}
    else
      {:already_confirmed, _} -> {:ok, @confirmation_sent}
      {:not_found, _} -> {:ok, @confirmation_sent}
      {:error, message} -> {:error, message}
    end
  end

  defp find_user_by_email(%{"email" => email}) do
    with %User{} = user <- @user_repo.find_by_email(email) do
      {:ok, user}
    else
      _ -> {:not_found, @account_not_found}
    end
  end

  defp reset_confirmation_token(%User{} = user) do
    User.changeset(:confirmation, user) |> @user_repo.update()
  end
end
