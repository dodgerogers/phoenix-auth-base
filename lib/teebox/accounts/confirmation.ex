defmodule Teebox.Accounts.Confirmation do
  alias Teebox.Accounts.User

  @user_repo Application.get_env(:teebox, :user_repo)
  @token_expiry_in_mins 10

  def confirm!(%{email: email, confirmation_token: confirmation_token} = _params) do
    with {:ok, user} <- find_user_by_confirmation(email, confirmation_token),
         {:ok} <- user_is_not_confirmed?(user),
         {:ok} <- valid_confirmation_token?(user),
         {:ok, confirmed_user} <- confirm_user(user)
    do
      {:ok, confirmed_user}
    else
      {:error, err} -> {:error, err}
    end
  end
  def confirm!(_), do: {:error, "Invalid arguments"}

  defp find_user_by_confirmation(email, confirmation_token) do
    with %User{} = user <- @user_repo.find_by_confirmation(email, confirmation_token) do
      {:ok, user}
    else
      nil -> {:error, "Could not find user"}
    end
  end

  defp user_is_not_confirmed?(%User{} = user) do
    if !confirmed?(user) do
      {:ok}
    else
      {:error, "User is already confirmed"}
    end
  end

  defp confirmed?(%User{} = user) do
    user.confirmed_at && !!user.confirmation_token && !!user.confirmation_sent_at
  end

  defp valid_confirmation_token?(%User{} = user) do
    token_expiry_time = Timex.shift(user.confirmation_sent_at, minutes: @token_expiry_in_mins)
    if Timex.before?(Timex.now, token_expiry_time) do
      {:ok}
    else
      {:error, "Confirmation token has expired"}
    end
  end

  defp confirm_user(%User{} = user) do
    User.changeset(:confirm, user) |> @user_repo.update()
  end
end
