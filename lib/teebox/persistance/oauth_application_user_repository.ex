defmodule Teebox.Persistance.OauthApplicationUserRepository do
  alias Teebox.Repo
  alias Teebox.Accounts.OauthApplicationUser

  def create(%{name: _} = attrs) do
    OauthApplicationUser.changeset(%OauthApplicationUser{}, attrs)
    |> Repo.insert()
  end

  def find_by_name(name) do
    Repo.get_by(OauthApplicationUser, %{name: name})
  end
end
