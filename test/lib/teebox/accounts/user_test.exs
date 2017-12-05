defmodule Teebox.Accounts.UserTest do
  use Teebox.ModelCase

  alias Teebox.Accounts.User

  @password "strongpw123!"
  @valid_attrs %{
    name: "name",
    email: "valid@email.com",
    password: @password,
    password_confirmation: @password
  }
  @invalid_attrs %{}

  test "registration changeset with valid attributes" do
    changeset = User.changeset(:registration, %User{}, @valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.confirmation_token
    assert changes.confirmation_sent_at
    assert changes.password_hash
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
    invalid_email = Faker.Lorem.characters(254) <> @valid_attrs.email
    invalid_email_attrs = Map.merge(@valid_attrs, %{email: invalid_email})
    changeset = User.changeset(:registration, %User{}, invalid_email_attrs)

    refute changeset.valid?
    assert changeset.errors[:email]
  end

  test "registration changset with weak password" do
    pw = "password"
    invalid_pw_attrs = Map.merge(@valid_attrs, %{password: pw, password_confirmation: pw})
    changeset = User.changeset(:registration, %User{}, invalid_pw_attrs)

    refute changeset.valid?
    assert changeset.errors[:password]
  end

  test "registration changset when password and password_confirmation do not match" do
    invalid_pw_attrs = Map.merge(@valid_attrs, %{password: @password, password_confirmation: @password <> "1"})
    changeset = User.changeset(:registration, %User{}, invalid_pw_attrs)

    refute changeset.valid?
    assert changeset.errors[:password_confirmation]
  end

  test "confirm changeset with valid params" do
    changeset = User.changeset(:confirm, %User{})

    assert changeset.valid?
    assert changeset.changes.confirmed_at
  end
end
