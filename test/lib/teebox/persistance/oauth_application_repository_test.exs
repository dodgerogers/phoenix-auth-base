defmodule Teebox.Persistance.OauthApplicationRepositoryTest do
  use Teebox.ModelCase

  import Teebox.Factory
  alias Teebox.Persistance.OauthApplicationRepository

  @app_name "name"

  test "create with valid params returns a OauthApplication struct" do
    oauth_application_user = insert(:oauth_application_user)
    attrs = Map.take(params_for(:oauth_application), [:name, :redirect_uri])

    {:ok, oauth_application} = OauthApplicationRepository.create(oauth_application_user, attrs)

    assert oauth_application.name == attrs.name
    assert oauth_application.owner_id == oauth_application_user.id
    assert oauth_application.uid
    assert oauth_application.secret
  end

  test "create with invalid params returns an invalid changeset" do
    oauth_application_user = insert(:oauth_application_user)

    {:error, changeset} = OauthApplicationRepository.create(oauth_application_user, %{name: "", redirect_uri: ""})

    refute changeset.valid?
  end

  test "find_by_owner_and_name returns oauth_application when aplication exists with given params" do
    oauth_application = insert(:oauth_application, %{name: @app_name})
    owner_id = oauth_application.owner.id

    found_oauth_application = OauthApplicationRepository.find_by_owner_and_name(owner_id, @app_name)

    assert oauth_application.id == found_oauth_application.id
  end

  test "find_by_owner_and_name returns nil when user does not exist" do
    refute OauthApplicationRepository.find_by_owner_and_name(999_999_999, "non existant")
  end
end
