defmodule Teebox.Accounts.RegistrationTest do
  use Teebox.ModelCase, async: true
  use Bamboo.Test

  alias Teebox.Accounts.Registration
  alias Teebox.Accounts.Schemas.{Profile, User}

  @password "Pword12345678!$%"
  @valid_attrs %{
    "name" => "profile123",
    "email" => "email@email.com",
    "password" => @password,
    "password_confirmation" => @password
  }

  defp user_count, do: length(Teebox.Repo.all(User))
  defp profile_count, do: length(Teebox.Repo.all(Profile))

  test "call with valid params create user and profile and sends confirmation email" do
    initial_user_count = user_count()
    initial_profile_count = profile_count()

    {:ok, user} = Registration.call(@valid_attrs)

    assert user_count() == initial_user_count + 1
    assert profile_count() == initial_profile_count + 1
    assert_delivered_email(Teebox.Accounts.Message.confirm_request(user))
  end

  test "call returns an error tuple with changeset when user fails to save" do
    initial_user_count = user_count()
    initial_profile_count = profile_count()

    invalid_attrs = @valid_attrs |> Map.merge(%{"email" => nil})
    {:error, changeset} = Registration.call(invalid_attrs)

    assert user_count() == initial_user_count
    assert profile_count() == initial_profile_count
    assert changeset.errors[:email]
  end

  test "call returns an error tuple with changeset when profile fails to save" do
    initial_user_count = user_count()
    initial_profile_count = profile_count()

    invalid_attrs = @valid_attrs |> Map.put("name", nil)
    {:error, changeset} = Registration.call(invalid_attrs)

    assert user_count() == initial_user_count
    assert profile_count() == initial_profile_count
    assert changeset.errors[:name]
  end
end
