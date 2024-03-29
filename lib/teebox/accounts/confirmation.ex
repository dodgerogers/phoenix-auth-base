defmodule Teebox.Accounts.Confirmation do
  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.Repositories.UsersRepository
  alias Teebox.Services.TimeUtil

  @account_not_found "Could not find account"
  @confirmation_sent "If an account exists we have sent a confirmation code"
  @token_expiry_in_secs Application.get_env(:teebox, :confirmation_token_expiry)

  def confirm!(%{"email" => _, "confirmation_token" => _} = params) do
    with {:ok, user} <- find_user_by_token(params),
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
    with %User{} = user <- UsersRepository.find_by_confirmation(email, token) do
      {:ok, user}
    else
      _ -> {:error, @account_not_found}
    end
  end

  defp user_not_confirmed?(%User{} = user) do
    if !confirmed?(user) do
      {:ok, user}
    else
      {:already_confirmed, user}
    end
  end

  def confirmed?(%User{} = user) do
    user.confirmed_at && !user.confirmation_token && !user.confirmation_sent_at
  end

  defp valid_confirmation_token?(%User{} = user) do
    expiry_in_mins = round(@token_expiry_in_secs / 60)
    if TimeUtil.expired?(user.confirmation_sent_at, expiry_in_mins) do
      {:ok}
    else
      {:error, "Confirmation token has expired"}
    end
  end

  defp confirm_user(%User{} = user) do
    User.changeset(:confirm, user)
    |> UsersRepository.update()
  end

  def resend_confirmation(%{"email" => _} = params) do
    with {:ok, user} <- find_user_by_email(params),
         {:ok, _} <- user_not_confirmed?(user),
         {:ok, updated_user} <- reset_confirmation_token(user),
         _ <- send_confirmation_email(updated_user)
    do
      {:ok, @confirmation_sent}
    else
      {:already_confirmed, confirmed_user} ->
        send_already_confirmed_email(confirmed_user)
        {:ok, @confirmation_sent}
      {:not_found, _} -> {:ok, @confirmation_sent}
      {:error, message} -> {:error, message}
    end
  end

  defp send_confirmation_email(unconfirmed_user) do
    Teebox.Accounts.Message.confirm_request(unconfirmed_user)
    |> Teebox.Mailer.deliver_now
  end

  defp send_already_confirmed_email(confirmed_user) do
    Teebox.Accounts.Message.already_confirmed(confirmed_user)
    |> Teebox.Mailer.deliver_now
  end

  defp find_user_by_email(%{"email" => email}) do
    with %User{} = user <- UsersRepository.find_by_email(email) do
      {:ok, user}
    else
      _ -> {:not_found, @account_not_found}
    end
  end

  defp reset_confirmation_token(%User{} = user) do
    User.changeset(:confirmation, user)
    |> UsersRepository.update()
  end
end
