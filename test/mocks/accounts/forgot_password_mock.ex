defmodule Teebox.Accounts.ForgotPasswordMock do
  @error_msg "Failure"

  def call(%{"email" => _}), do: {:ok}
  def call(_), do: {:error, @error_msg}
end
