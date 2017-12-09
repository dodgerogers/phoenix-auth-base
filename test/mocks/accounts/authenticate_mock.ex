defmodule Teebox.Accounts.AuthenticateMock do
  @error_msg "Failure"

  def call(%{"grant_type" => "password", "username" => _, "password" => _}) do
    {:ok, %{code: %{access_token: "token"}}}
  end
  def call(%{"grant_type" => _, "username" => _, "password" => _}) do
    {:error, @error_msg}
  end
  def call(_), do: {:error, @error_msg, 401}
end
