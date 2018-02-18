defmodule Teebox.Accounts.AuthenticateMock do
  import Teebox.Factory

  @error_msg "Failure"

  def call(%{"grant_type" => "password", "username" => _, "password" => _}) do
    mock_token = build(:oauth_access_token)
    {:ok, %{
        access_token: mock_token.token,
        created_at: NaiveDateTime.utc_now(),
        expires_in: mock_token.expires_in,
        token_type: 'Bearer'
      }
    }
  end
  def call(%{"grant_type" => _, "username" => _, "password" => _}) do
    {:error, @error_msg}
  end
  def call(_), do: {:error, @error_msg, 401}
end
