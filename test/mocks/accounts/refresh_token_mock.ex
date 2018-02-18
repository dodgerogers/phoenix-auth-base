defmodule Teebox.Accounts.RefreshTokenMock do
  import Teebox.Factory

  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  @error_msg "Failure"

  def call(%OauthAccessToken{} = _token) do
    mock_token = build(:oauth_access_token)
    {:ok, %{
        access_token: mock_token.token,
        created_at: NaiveDateTime.utc_now(),
        expires_in: mock_token.expires_in,
        token_type: 'Bearer'
      }
    }
  end
  def call(_), do: {:error, @error_msg}
end
