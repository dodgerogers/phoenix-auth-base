defmodule Teebox.UserTest do
  use Teebox.ModelCase

  alias Teebox.User

  @valid_attrs %{
    email: "some@email.com",
    name: "test",
    provider: to_string(:identity),
    uid: Ecto.UUID.generate(),
    token: Ecto.UUID.generate()
  }
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
