defmodule Teebox.Accounts.RevokeTokenTest do
  use Teebox.ModelCase, async: true

  import TeeboxWeb.AuthCase

  alias Teebox.Accounts.RevokeToken
  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  describe "call" do
    test "with valid params returns :ok and sets revoked_at on the given token" do
      user = insert(:user)
      oauth_application = create_default_oauth_application()
      oauth_access_token = insert(:oauth_access_token, resource_owner: user, application: oauth_application)

      {:ok, %{}} = RevokeToken.call(%{"token" => oauth_access_token.token})

      refuted_token = Repo.get(OauthAccessToken, oauth_access_token.id)
      assert refuted_token.revoked_at
    end

    test "with invalid token returns :ok" do
      result = RevokeToken.call(%{"token" => "token"})

      assert :ok == elem(result, 0)
    end

    test "with invalid arguments returns an error tuple" do
      {:error, message} = RevokeToken.call(%{})

      assert message == "Invalid arguments"
    end
  end
end
