defmodule Teebox.Accounts.ResetPasswordTest do
  use Teebox.ModelCase, async: true

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.ResetPassword
  alias Teebox.Accounts.Repositories.UsersRepository

  @email "email@email.com"
  @token "token"
  @valid_attrs %{
    "email" => @email,
    "reset_password_token" => @token,
    "password" => "Strongpw123",
    "password_confirmation" => "Strongpw123",
  }

  describe "call" do
    test "with valid params sets password" do
      create_user_with_valid_reset(%{email: @email, reset_password_token: @token})

      {:ok} = ResetPassword.call(@valid_attrs)

      user = UsersRepository.find_by_email(@email)

      refute user.reset_password_token
      refute user.reset_password_sent_at
      assert user.password_hash
    end

    test "with ivalid params" do
      {:error, message} = ResetPassword.call(%{})

      assert message == "Invalid arguments"
    end

    test "with expired token" do
      create_user_with_expired_reset_token(%{email: @email, reset_password_token: @token})

      {:error, message} = ResetPassword.call(@valid_attrs)

      user = UsersRepository.find_by_password_reset(@email, @token)

      assert message == "Password reset token has expired"
      assert user.reset_password_token == @token
      assert user.reset_password_sent_at
    end

    test "with no non existant email token" do
      create_user_with_expired_reset_token(%{email: @email <> "1", reset_password_token: @token})

      {:error, message} = ResetPassword.call(@valid_attrs)

      assert message == "Could not find account"
    end

    test "when passwords do not match" do
      create_user_with_valid_reset(%{email: @email, reset_password_token: @token})
      invalid_attrs = Map.merge(@valid_attrs, %{"password" => "not-matching"})

      {:error, changeset} = ResetPassword.call(invalid_attrs)

      user = UsersRepository.find_by_password_reset(@email, @token)

      assert changeset.errors == [password_confirmation: {"Passwords do not match", []}]
      assert user.reset_password_token == @token
      assert user.reset_password_sent_at
    end
  end
end
