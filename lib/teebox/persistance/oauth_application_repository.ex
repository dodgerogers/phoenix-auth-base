defmodule Teebox.Persistance.OauthApplicationRepository do
  alias Teebox.Repo
  alias ExOauth2Provider.OauthApplications
  alias ExOauth2Provider.OauthApplications.OauthApplication

  def create(app_user, %{name: name, redirect_uri: redirect_uri}) do
    OauthApplications.create_application(app_user, %{name: name, redirect_uri: redirect_uri})
  end

  def find_by_owner_and_name(owner_id, name) do
    Repo.get_by(OauthApplication, %{owner_id: owner_id, name: name})
  end
end
