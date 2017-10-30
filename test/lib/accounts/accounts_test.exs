defmodule Teebox.AccountsTest do
  use Teebox.ModelCase
  import Teebox.Factory
  alias Teebox.Accounts
  alias Teebox.Accounts.User

  @create_attrs params_for(:user, email: "fred@example.com", password: "reallyHard2gue$$")
  @update_attrs %{email: "frederick@example.com"}
  @invalid_attrs %{email: nil}

  test "list_users/1 returns all users" do
    user = insert(:user)
    assert Accounts.list_users() == [user]
  end

  test "get returns the user with given id" do
    user = insert(:user)
    assert Accounts.get(user.id) == user
  end

  test "create_user/1 with valid data creates a user" do
    assert {:ok, %User{} = user} = Accounts.create_user(@create_attrs)
    assert user.email == "fred@example.com"
  end

  test "create_user/1 with invalid data returns error changeset" do
    assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
  end

  test "update_user/2 with valid data updates the user" do
    user = insert(:user)
    assert {:ok, user} = Accounts.update_user(user, @update_attrs)
    assert %User{} = user
    assert user.email == "frederick@example.com"
  end

  test "update_user/2 with invalid data returns error changeset" do
    user = insert(:user)
    assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
    assert user == Accounts.get(user.id)
  end

  test "delete_user/1 deletes the user" do
    user = insert(:user)
    assert {:ok, %User{}} = Accounts.delete_user(user)
    refute Accounts.get(user.id)
  end

  test "change_user/1 returns a user changeset" do
    user = insert(:user)
    assert %Ecto.Changeset{} = Accounts.change_user(user)
  end

  test "update password changes the stored hash" do
    %{password_hash: stored_hash} = user = insert(:user)
    attrs = %{password: "CN8W6kpb"}
    {:ok, %{password_hash: hash}} = Accounts.update_password(user, attrs)
    assert hash != stored_hash
  end

  test "update_password with weak password fails" do
    user = insert(:user)
    attrs = %{password: "pass"}
    assert {:error, %Ecto.Changeset{}} = Accounts.update_password(user, attrs)
  end
end
