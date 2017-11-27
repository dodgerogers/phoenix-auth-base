defmodule Teebox.Accounts.ConfirmationTest do
  use Teebox.ModelCase
  use Timex
  use Bamboo.Test

  import TeeboxWeb.AuthCase

  alias Teebox.Accounts.Confirmation
  @user_repo Application.get_env(:teebox, :user_repo)

  @email "email@email.com"
  @confirmation_token Faker.Lorem.characters(30)
  @valid_attrs %{
    "email" => @email,
    "confirmation_token" => @confirmation_token
  }

  setup do
    @user_repo.clear()
  end

  def find_user_by_email(email), do: @user_repo.find_by_email(email)

  test "call with valid params confirms user" do
    create_unconfirmed_user(@email, @confirmation_token)

    {:ok, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "Your account has been confirmed!"
    confirmed_user = find_user_by_email(@email)
    assert confirmed_user.confirmed_at
    refute confirmed_user.confirmation_token
    refute confirmed_user.confirmation_sent_at
  end

  test "call with already confirmed user returns error tuple" do
    create_confirmed_user(@email)

    {:error, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "Account is already confirmed"
  end

  test "call with expired confirmation token returns error tuple" do
    create_unconfirmed_user_with_expired_token(@email, @confirmation_token)

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

  test "resend_confirmation updates user confirmation token and resends email" do
    {:ok, user} = create_unconfirmed_user(@email, @confirmation_token)
    previous_token = user.confirmation_token

    {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email})

    unconfirmed_user = find_user_by_email(@email)
    refute previous_token == unconfirmed_user.confirmation_token
    assert message == "If an account exists we have sent a confirmation code"
    assert_delivered_email Teebox.Accounts.Message.confirm_request(unconfirmed_user)
  end

  test "resend_confirmation returns ok when user cannot be found" do
    {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email <> "1"})

    assert message == "If an account exists we have sent a confirmation code"
  end

  test "resend_confirmation returns ok when user is already confirmed" do
    create_confirmed_user(@email)

    {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email})

    assert message == "If an account exists we have sent a confirmation code"
  end
end
