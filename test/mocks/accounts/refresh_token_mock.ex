defmodule Teebox.Accounts.RefreshTokenMock do
  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  @error_msg "Failure"

  def call(%OauthAccessToken{} = _token) do
    {:ok, %{token: "token"}}
  end
  def call(_), do: {:error, @error_msg}
end
