defmodule Teebox.Accounts.ConfirmAndSignInUserTest do
  use Teebox.ModelCase, async: true

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.ConfirmAndSignInUser
  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  @email "user@email.com"
  @password "P@55W0rd987"
  @token "token"
  @params %{
    "email" => @email,
    "password" => @password,
    "confirmation_token" => @token
  }

  def access_token_count(), do: Teebox.Repo.aggregate(OauthAccessToken, :count, :id)

  test "call with valid params confirms user and returns an access token" do
    user = create_unconfirmed_user(%{email: @email, password: @password, confirmation_token: @token})

    {:ok, _access_token} = ConfirmAndSignInUser.call(@params)

    confirmed_user = reload_user(user)
    assert confirmed_user.confirmed_at
    assert 1 == access_token_count()
  end

  test "call with invalid password returns error and does not confirm user or grant token" do
    user = create_unconfirmed_user(%{email: @email, password: @password, confirmation_token: @token})
    invalid_params = Map.merge(@params, %{"password" => @password <> "1"})

    {:error, _message} = ConfirmAndSignInUser.call(invalid_params)

    refute user.confirmed_at
    assert 0 == access_token_count()
  end

  test "call with confirmed user returns error and does not grant access token" do
    user = create_confirmed_user(%{email: @email, password: @password})

    {:error, _message} = ConfirmAndSignInUser.call(@params)

    confirmed_user = reload_user(user)
    assert confirmed_user.confirmed_at
    assert 0 == access_token_count()
  end
end
