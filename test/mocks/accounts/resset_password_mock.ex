defmodule Teebox.Accounts.ResetPasswordMock do
  @error_msg "Failure"

  def call(%{"email" => _, "reset_password_token" => _, "password" => _, "password_confirmation" => _}), do: {:ok}
  def call(_), do: {:error, @error_msg}
end
