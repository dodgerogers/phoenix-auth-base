defmodule Teebox.Accounts.GenerateGeneratePasswordResetTest do
  use Teebox.ModelCase, async: true
  use Timex
  use Bamboo.Test

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.GeneratePasswordReset
  alias Teebox.Accounts.Repositories.UsersRepository

  @email "email@email.com"
  @valid_attrs %{
    "email" => @email
  }

  describe "call" do
    test "with valid params sets reset_password_token and reset_password_sent_at and sends email" do
      create_confirmed_user(%{email: @email})

      {:ok, message} = GeneratePasswordReset.call(@valid_attrs)

      assert message == "A password reset email has been sent"
      updated_user = UsersRepository.find_by_email(@email)
      assert updated_user.reset_password_token
      assert updated_user.reset_password_sent_at
      assert_delivered_email Teebox.Accounts.Message.reset_password(updated_user)
    end

    test "with non existant email returns message" do
      {:ok, message} = GeneratePasswordReset.call(%{"email" => @email <> "1"})

      assert message == "A password reset email has been sent"
    end
  end

  describe "changeset" do
    test 'returns valid changeset' do
      changeset = GeneratePasswordReset.changeset(%User{})

      assert changeset.valid?
      changes = changeset.changes
      assert changes.reset_password_token
      assert changes.reset_password_sent_at
    end
  end
end
