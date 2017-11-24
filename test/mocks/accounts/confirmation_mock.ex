defmodule Teebox.Accounts.ConfirmationMock do
  def confirm!(%{"email" => _, "confirmation_token" => _}), do: {:ok, "Success"}
  def confirm!(_), do: {:error, "Failure"}

  def resend_confirmation(%{"email" => _}), do: {:ok, "Success"}
  def resend_confirmation(_), do: {:error, "Failure"}
end
