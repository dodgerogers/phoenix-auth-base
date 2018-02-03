defmodule Teebox.Accounts.ForgotPasswordTest do
  use Teebox.ModelCase, async: true
  use Bamboo.Test

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.ForgotPassword
  alias Teebox.Accounts.Repositories.UsersRepository

  @email "email@email.com"
  @valid_attrs %{
    "email" => @email
  }

  describe "call" do
    test "with valid params sets reset_password_token and reset_password_sent_at and sends email" do
      create_confirmed_user(%{email: @email})

      {:ok} = ForgotPassword.call(@valid_attrs)

      updated_user = UsersRepository.find_by_email(@email)
      assert updated_user.reset_password_token
      assert updated_user.reset_password_sent_at
      assert_delivered_email Teebox.Accounts.Message.reset_password(updated_user)
    end

    test "with non existant email returns success" do
      result = ForgotPassword.call(%{"email" => @email <> "1"})

      assert result == {:ok}
    end
  end

  describe "changeset" do
    test 'returns valid changeset' do
      changeset = ForgotPassword.changeset(%User{})

      assert changeset.valid?
      changes = changeset.changes
      assert changes.reset_password_token
      assert changes.reset_password_sent_at
    end
  end
end
