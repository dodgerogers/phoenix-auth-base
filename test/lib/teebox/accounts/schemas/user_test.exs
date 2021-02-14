defmodule Teebox.Accounts.Schemas.UserTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Accounts.Schemas.User

  @password "strongpw123!"
  @valid_attrs %{
    email: "valid@email.com",
    password: @password,
    password_confirmation: @password
  }
  @invalid_attrs %{}

  test "registration changeset with valid attributes" do
    changeset = User.changeset(:registration, %User{}, @valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
    assert changes.password
    assert changes.password_hash
    assert changes.confirmation_token
    assert changes.confirmation_sent_at
  end

  test "registration changeset with invalid attributes" do
    changeset = User.changeset(:registration, %User{}, @invalid_attrs)

    refute changeset.valid?
  end

  test "registration changset with invalid email" do
    invalid_email_attrs = Map.merge(@valid_attrs, %{email: "invalid.email"})
    changeset = User.changeset(:registration, %User{}, invalid_email_attrs)

    refute changeset.valid?
    assert changeset.errors[:email]
  end

  test "registration changset with an email which is too long" do
    invalid_email = to_string(Faker.Lorem.characters(254)) <> @valid_attrs.email
    invalid_email_attrs = Map.merge(@valid_attrs, %{email: invalid_email})
    changeset = User.changeset(:registration, %User{}, invalid_email_attrs)

    refute changeset.valid?
    assert changeset.errors[:email]
  end

  test "confirm changeset with valid params" do
    changeset = User.changeset(:confirm, %User{})

    assert changeset.valid?
    assert changeset.changes.confirmed_at
  end
end
