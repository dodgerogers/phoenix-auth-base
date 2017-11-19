defmodule Teebox.Accounts.ConfirmationMock do
  def confirm!(%{"email" => _, "confirmation_token" => _}), do: {:ok, "Your account has been confirmed"}
  def confirm!(_), do: {:error, "User not confirmed"}
end
