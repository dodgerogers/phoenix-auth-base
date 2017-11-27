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

  test "call with valid params confirms user" do
    create_unconfirmed_user(@email, @confirmation_token)

    {:ok, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "Your account has been confirmed!"
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
    create_unconfirmed_user(@email, @confirmation_token)

    {:ok, message} = Confirmation.resend_confirmation(%{"email" => @email})

    assert message == "If an account exists we have sent a confirmation code"
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
