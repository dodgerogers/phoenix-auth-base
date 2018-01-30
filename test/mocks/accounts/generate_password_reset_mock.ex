defmodule Teebox.Accounts.GeneratePasswordResetMock do
  @success_msg "Success"
  @error_msg "Failure"

  def call(%{"email" => _}), do: {:ok, @success_msg}
  def call(_), do: {:error, @error_msg}
end
