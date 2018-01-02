defmodule Teebox.Accounts.ConfirmationTest do
  use Teebox.ModelCase, async: true
  use Timex
  use Bamboo.Test

  import Teebox.Web.AuthCase

  alias Teebox.Accounts.Confirmation
  alias Teebox.Accounts.Repositories.UsersRepository

  @email "email@email.com"
  @confirmation_token to_string(Faker.Lorem.characters(30))
  @valid_attrs %{
    "email" => @email,
    "confirmation_token" => @confirmation_token
  }

  describe "call" do
    test "with valid params confirms user" do
      create_unconfirmed_user(%{email: @email, confirmation_token: @confirmation_token})

      {:ok, message} = Confirmation.confirm!(@valid_attrs)

      assert message == "Your account has been confirmed!"
      confirmed_user = UsersRepository.find_by_email(@email)
      assert confirmed_user.confirmed_at
      refute confirmed_user.confirmation_token
      refute confirmed_user.confirmation_sent_at
    end

    test "call with expired confirmation token returns error tuple" do
      create_unconfirmed_user_with_expired_token(%{email: @email, confirmation_token: @confirmation_token})

      {:error, message} = Confirmation.confirm!(@valid_attrs)

      assert message == "Confirmation token has expired"
    end

    test "call with unknown email returns an error tuple" do
      {:error, message} = Confirmation.confirm!(@valid_attrs)

      assert message == "Could not find account"
    end

    test "call with invalid attrs returns an error tuple" do
      {:error, message} = Confirmation.confirm!(%{})

      assert message == "Invalid arguments"
    end
  end

  describe "resend_confirmation" do
    test "updates user confirmation token and resends email" do
      user = create_unconfirmed_user(%{email: @email, confirmation_token: @confirmation_token})
      previous_token = user.confirmation_token

      {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email})

      unconfirmed_user = UsersRepository.find_by_email(@email)
      refute previous_token == unconfirmed_user.confirmation_token
      assert message == "If an account exists we have sent a confirmation code"
      assert_delivered_email Teebox.Accounts.Message.confirm_request(unconfirmed_user)
    end

    test "returns ok when user cannot be found" do
      {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email <> "1"})

      assert message == "If an account exists we have sent a confirmation code"
    end

    test "returns ok when user is already confirmed and sends email" do
      user = create_confirmed_user(%{email: @email})

      {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email})

      assert_delivered_email Teebox.Accounts.Message.already_confirmed(user)
      assert message == "If an account exists we have sent a confirmation code"
    end
  end
end
