defmodule Teebox.Accounts.RegistrationTest do
  use Teebox.ModelCase, async: true
  use Bamboo.Test

  alias Teebox.Accounts.{Registration}

  @password "Pword12345678!$%"
  @valid_attrs %{
    name: "Bob",
    email: "email@email.com",
    password: @password,
    password_confirmation: @password
  }

  setup do
    Teebox.Persistance.UsersRepositoryMock.clear()
  end

  defp user_count, do: length(Teebox.Persistance.UsersRepositoryMock.all())

  test "call with valid params create user when valid and sends confirmation email" do
    before_users = user_count()

    {:ok, user} = Registration.call(@valid_attrs)

    assert user_count() == (before_users + 1)
    assert_delivered_email Teebox.Accounts.Message.confirm_request(user)
  end

  test "call with invalid params returns an error tuple" do
    before_users = user_count()

    invalid_attrs = @valid_attrs |> Map.merge(%{email: nil})
    {:error, changeset} = Registration.call(invalid_attrs)

    assert user_count() == before_users
    assert changeset.errors[:email]
  end
end
