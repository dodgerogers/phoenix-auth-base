defmodule Teebox.Accounts.OauthApplicationUserTest do
  use Teebox.ModelCase

  alias Teebox.Accounts.OauthApplicationUser

  import Teebox.Factory

  @valid_attrs %{
    name: "name",
  }

  test "changeset with valid attributes" do
    changeset = OauthApplicationUser.changeset(%OauthApplicationUser{}, @valid_attrs)

    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = OauthApplicationUser.changeset(%OauthApplicationUser{}, %{})

    refute changeset.valid?
  end

  test "changeset when name is already taken" do
    insert(:oauth_application_user, @valid_attrs)

    invalid_changeset = OauthApplicationUser.changeset(%OauthApplicationUser{}, @valid_attrs)
    {:error, changeset} = Repo.insert(invalid_changeset)

    refute changeset.valid?
  end

  test "changeset when name is too long" do
    invalid_attrs = Map.merge(@valid_attrs, %{name: Faker.Lorem.characters(50)})
    changeset = OauthApplicationUser.changeset(%OauthApplicationUser{}, invalid_attrs)

    refute changeset.valid?
  end
end
