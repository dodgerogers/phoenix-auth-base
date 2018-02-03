defmodule Teebox.Accounts.Services.PasswordTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Accounts.Services.Password

  @password "Strongpw123!"
  @valid_attrs %{
    password: @password,
    password_confirmation: @password
  }

  setup do
    user = build(:user)

    {:ok, %{user: user}}
  end

  test "changeset with valid attributes", %{user: user}  do
    changeset = Password.changeset(user, @valid_attrs)

    assert changeset.valid?
  end

  test "changset with invalid params", %{user: user} do
    changeset = Password.changeset(user, %{password: "", password_confirmation: ""})

    refute changeset.valid?
    assert changeset.errors == [
      password: {"can't be blank", [validation: :required]},
      password_confirmation: {"can't be blank", [validation: :required]}
    ]
  end

  test "changset with weak password", %{user: user} do
    pw = "password"
    invalid_pw_attrs = Map.merge(@valid_attrs, %{password: pw, password_confirmation: pw})
    changeset = Password.changeset(user, invalid_pw_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      password: {
        "The password you have chosen is weak because it is easy to guess. Please choose another one.",
        []
      }
    ]
  end

  test "changset when password and password_confirmation do not match", %{user: user} do
    invalid_pw_attrs = Map.merge(@valid_attrs, %{password: @password, password_confirmation: @password <> "1"})
    changeset = Password.changeset(user, invalid_pw_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      password_confirmation: {"Passwords do not match", []},
    ]
  end
end
