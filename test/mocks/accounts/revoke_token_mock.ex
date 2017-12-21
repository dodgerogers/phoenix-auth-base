defmodule Teebox.Accounts.RevokeTokenMock do
  @error_msg "Failure"

  def call(%{"token" => _}) do
    {:ok, %{}}
  end
  def call(_), do: {:error, @error_msg}
end
