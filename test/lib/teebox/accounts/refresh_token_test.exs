defmodule Teebox.Accounts.RefreshTokenTest do
  use Teebox.ModelCase, async: true

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.RefreshToken
  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  describe "call" do
    test "with valid params returns :ok revokes old token and issues new token" do
      user = insert(:user)
      oauth_application = create_default_oauth_application()
      oauth_access_token = insert(:oauth_access_token, resource_owner: user, application: oauth_application)

      {:ok, new_token} = RefreshToken.call(oauth_access_token)

      assert new_token.access_token
      revoked_token = Repo.get(OauthAccessToken, oauth_access_token.id)
      refute new_token.access_token == revoked_token.token
      assert revoked_token.revoked_at
    end

    test "with revoked token returns error tuple" do
      user = insert(:user)
      oauth_application = create_default_oauth_application()
      revoked_attrs = %{
        revoked_at: NaiveDateTime.utc_now(),
        resource_owner: user,
        application: oauth_application
      }
      revoked_token = insert(:oauth_access_token, revoked_attrs)

      assert {:error, _message} = RefreshToken.call(revoked_token)
    end

    test "with invalid arguments returns an error tuple" do
      {:error, message} = RefreshToken.call('token')

      assert message == "Invalid arguments"
    end
  end
end
