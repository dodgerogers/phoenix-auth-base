defmodule Teebox.Persistance.OauthApplicationUserRepositoryTest do
  use Teebox.ModelCase, async: true

  import Teebox.Factory
  alias Teebox.Persistance.OauthApplicationUserRepository
  alias Teebox.Accounts.OauthApplicationUser

  @name "name"

  test "create with valid params returns a OauthApplicationUser struct" do
    attrs = params_for(:oauth_application_user)

    {:ok, oauth_application_user} = OauthApplicationUser.changeset(%OauthApplicationUser{}, attrs)
    |> OauthApplicationUserRepository.create()

    assert oauth_application_user.name == attrs.name
  end

  test "create with valid params returns an invalid changeset" do
    attrs = params_for(:oauth_application_user, name: "")

    {:error, changeset} = OauthApplicationUser.changeset(%OauthApplicationUser{}, attrs)
    |> OauthApplicationUserRepository.create()

    refute changeset.valid?
  end

  test "find_by_name returns oauth_application_user when user exists with given params" do
    oauth_application_user = insert(:oauth_application_user, name: @name)

    found_oauth_application_user = OauthApplicationUserRepository.find_by_name(@name)

    assert oauth_application_user == found_oauth_application_user
  end

  test "find_by_name returns nil when oauth_application_user does not exist" do
    refute OauthApplicationUserRepository.find_by_name(@name)
  end
end
