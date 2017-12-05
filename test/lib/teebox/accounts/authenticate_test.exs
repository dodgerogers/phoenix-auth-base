defmodule Teebox.Accounts.RegistrationTest do
  use Teebox.ModelCase

  import TeeboxWeb.AuthCase

  alias Teebox.Accounts.{Authenticate, User}

  @user_repo Application.get_env(:teebox, :user_repo)

  @email "email@email.com"
  @password "Pword12345678!$%"

  setup do
    @user_repo.clear()
  end

  # TODO: Clean up factories
  test "call with valid params returns user" do
    user = build_user_with_password(%{email: @email, password: @password})

    {:ok, confirmed_user} = User.changeset(:registration, user, %{})
    |> @user_repo.create()

    {:ok, valid_user} = Authenticate.call(@email, @password)

    assert valid_user == confirmed_user
  end

  test 'call when user is not confirmed returns error tuple' do
    user = build_user_with_password(%{email: @email, password: @password, confirmed_at: nil, confirmation_token: "token", confirmation_sent_at: DateTime.utc_now()})

    {:ok, confirmed_user} = User.changeset(:registration, user, %{})
    |> @user_repo.create()

    {:error, message} = Authenticate.call(@email <> "1", @password)

    assert message == "Account is not confirmed"
  end

  test "call when user cannot be found returns error tuple" do
    {:error, message} = Authenticate.call(@email <> "1", @password)

    assert message == "Invalid credentials"
  end

  test "call when password is not correct returns error tuple" do
    {:error, message} = Authenticate.call(@email, @password <> "1")

    assert message == "Invalid credentials"
  end
end
