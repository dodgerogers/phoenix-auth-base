defmodule Teebox.Accounts.TokenMock do
  @error_msg "Failure"

  def grant(%{"client_id" => _, "grant_type" => "password", "username" => _, "password" => _}) do
    {:ok, %{code: "code"}}
  end
  def grant(_), do: {:error, @error_msg, 400}
end
