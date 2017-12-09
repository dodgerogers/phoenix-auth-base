defmodule Teebox.Accounts.AuthenticateTest do
  use Teebox.ModelCase, async: true

  import TeeboxWeb.AuthCase

  alias Teebox.Accounts.Authenticate

  @email "email@email.com"
  @password "Pword12345678!$%"

  @invalid_credentials_msg "Invalid email or password"

  describe "call" do
    test "with valid params returns an access token" do
      create_confirmed_user(%{email: @email, password: @password})

      {:ok, code} = Authenticate.call(%{"grant_type" => "password", "username" => @email, "password" => @password})

      assert code.access_token
      refute code.refresh_token
      assert "bearer" == code.token_type
      assert 900 == code.expires_in
    end

    test "with invalid username returns an error tuple" do
      create_confirmed_user(%{email: @email, password: @password})

      {:error, message, status} = Authenticate.call(%{"grant_type" => "password", "username" => @email <> "1", "password" => @password})

      assert @invalid_credentials_msg == message
      assert :unauthorized == status
    end

    test "with invalid password returns an error tuple" do
      create_confirmed_user(%{email: @email, password: @password})

      {:error, message, status} = Authenticate.call(%{"grant_type" => "password", "username" => @email, "password" => @password <> "1"})

      assert @invalid_credentials_msg == message
      assert :unauthorized == status
    end

    test "with unconfirmed account returns an error tuple" do
      create_unconfirmed_user(%{email: @email, password: @password})

      {:error, message, status} = Authenticate.call(%{"grant_type" => "password", "username" => @email, "password" => @password})

      assert @invalid_credentials_msg == message
      assert :unauthorized == status
    end
  end

  describe "validate_user_credentials" do
    test "with valid params returns user" do
      confirmed_user = create_confirmed_user(%{email: @email, password: @password})

      {:ok, valid_user} = Authenticate.validate_user_credentials(@email, @password)

      assert confirmed_user.id == valid_user.id
    end

    test "when user is not confirmed returns error tuple" do
      create_unconfirmed_user(%{email: @email, password: @password})

      {:error, message} = Authenticate.validate_user_credentials(@email, @password)

      assert "Account is not confirmed" == message
    end

    test "when user cannot be found returns error tuple" do
      {:error, message} = Authenticate.validate_user_credentials(@email <> "1", @password)

      assert @invalid_credentials_msg == message
    end

    test "when password is not correct returns error tuple" do
      {:error, message} = Authenticate.validate_user_credentials(@email, @password <> "1")

      assert @invalid_credentials_msg == message
    end
  end
end
