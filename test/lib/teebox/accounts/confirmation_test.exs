defmodule Teebox.Accounts.ConfirmationTest do
  use Teebox.ModelCase
  use Timex

  import Teebox.Factory

  alias Teebox.Accounts.{Confirmation, User}
  @user_repo Application.get_env(:teebox, :user_repo)

  @email "email@email.com"
  @confirmation_token Faker.Lorem.characters(30)
  @valid_attrs %{
    email: @email,
    confirmation_token: @confirmation_token,
  }

  setup do
    @user_repo.clear()
  end

  test "call with valid params confirms user" do
    create_unconfirmed_user()

    {:ok, confirmed_user} = Confirmation.confirm!(@valid_attrs)

    assert confirmed_user.confirmed_at
    refute confirmed_user.confirmation_token
    refute confirmed_user.confirmation_sent_at
  end

  test "call with already confirmed user returns error tuple" do
    create_confirmed_user()

    {:error, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "User is already confirmed"
  end

  test "call with expired confirmation token returns error tuple" do
    create_unconfirmed_user_with_expired_token()

    {:error, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "Confirmation token has expired"
  end

  test "call with unknown email returns an error tuple" do
    {:error, message} = Confirmation.confirm!(@valid_attrs)

    assert message == "Could not find user"
  end

  test "call with invalid attrs returns an error tuple" do
    {:error, message} = Confirmation.confirm!(%{})

    assert message == "Invalid arguments"
  end

  defp create_unconfirmed_user do
    unconfirmed_user = build(:user, email: @email, confirmed_at: nil, confirmation_token: @confirmation_token, confirmation_sent_at: DateTime.utc_now())
    changeset = User.changeset(:registration, unconfirmed_user, %{})

    @user_repo.create(changeset)
  end

  defp create_confirmed_user do
    already_confirmed_user = build(:user, email: @email)
    changeset = User.changeset(:registration, already_confirmed_user, %{})

    @user_repo.create(changeset)
  end

  defp create_unconfirmed_user_with_expired_token do
    expired_datetime = Timex.shift(Timex.now, minutes: -11)
    unconfirmed_user = build(:user, email: @email)
    attrs = %{confirmation_sent_at: expired_datetime, confirmed_at: nil, confirmation_token: @confirmation_token}

    changeset = unconfirmed_user
    |> Ecto.Changeset.cast(attrs, Map.keys(attrs))

    @user_repo.create(changeset)
  end
end
