defmodule Teebox.Accounts.ConfirmAndAuthenticateMock do
  @error_msg "Failure"

  def call(%{"email" => _, "password" => _, "confirmation_token" => _}), do: {:ok, %{access_token: "token"}}
  def call(_), do: {:error, @error_msg}
end
