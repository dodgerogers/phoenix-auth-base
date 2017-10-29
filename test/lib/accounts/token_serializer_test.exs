defmodule Accounts.TokenSerializerTest do
  use Teebox.ModelCase
  import Teebox.Factory

  @unknown_resource "Unknown resource type"

  setup do
    Teebox.Persistance.UsersRepositoryMock.clear()

    {:ok, user} = build(:user, id: 1) |> Teebox.Persistance.UsersRepositoryMock.create()

    {:ok, %{user: user}}
  end

  test "for_token returns the user type and id", %{user: user} do
    {:ok, user_token_representation} = Teebox.Accounts.TokenSerializer.for_token(user)

    assert user_token_representation == "data:#{user.id}"
  end

  test "for_token it returns an error when a user struct is not provided" do
    {:error, reason} = Teebox.Accounts.TokenSerializer.for_token(%{})

    assert reason == @unknown_resource
  end

  test "from_token returns ok and user", %{user: user} do
    token = "data:#{user.id}"

    {:ok, found_user} = Teebox.Accounts.TokenSerializer.from_token(token)

    assert user == found_user
  end

  test "from_token returns ok and nil when user is not found" do
    token = "data:#{999_999_999}"

    {:ok, user} = Teebox.Accounts.TokenSerializer.from_token(token)

    refute user
  end

  test "from_token returns erorr when not given a user" do
    {:error, reason} = Teebox.Accounts.TokenSerializer.from_token(%{})

    assert reason == @unknown_resource
  end
end
