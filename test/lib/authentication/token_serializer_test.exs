defmodule Authentication.TokenSerializerTest do
  use Teebox.ModelCase
  import Teebox.Factory
  import Mock

  @unknown_resource "Unknown resource type"

  setup do
    user = build(:user, id: 1)
    {:ok, %{user: user}}
  end

  test "for_token returns the user type and id", %{user: user} do
    {:ok, user_token_representation} = Teebox.Authentication.TokenSerializer.for_token(user)
    assert user_token_representation == "User:#{user.id}"
  end

  test "for_token it returns an error when a user struct is not provided" do
    {:error, reason} = Teebox.Authentication.TokenSerializer.for_token(%{})
    assert reason == @unknown_resource
  end

  test "from_token returns ok and user", %{user: user} do
    token = "User:#{user.id}"

    with_mock Teebox.Repo, [get: fn(Teebox.User, _) -> user end] do
      {:ok, found_user} = Teebox.Authentication.TokenSerializer.from_token(token)

      assert user == found_user
    end
  end

  test "from_token returns ok and nil when user is not found", %{user: user} do
    token = "User:#{user.id}"

    with_mock Teebox.Repo, [get: fn(Teebox.User, _) -> nil end] do
      {:ok, user} = Teebox.Authentication.TokenSerializer.from_token(token)

      refute user
    end
  end

  test "from_token returns erorr when not given a user" do
    {:error, reason} = Teebox.Authentication.TokenSerializer.from_token(%{})

    assert reason == @unknown_resource
  end
end
