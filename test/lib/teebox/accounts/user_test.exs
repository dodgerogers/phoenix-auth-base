defmodule Teebox.Accounts.UserTest do
  use Teebox.ModelCase
  import Teebox.Factory

  alias Teebox.Accounts.User

  @valid_attrs params_for(:user)
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
