defmodule Teebox.Accounts.ConfirmationMock do
  @success_msg "Success"
  @error_msg "Failure"

  def confirm!(%{"email" => _, "confirmation_token" => _}), do: {:ok, @error_msg}
  def confirm!(_), do: {:error, @error_msg}

  def resend_confirmation(%{"email" => _}), do: {:ok, @success_msg}
  def resend_confirmation(_), do: {:error, @error_msg}
end
