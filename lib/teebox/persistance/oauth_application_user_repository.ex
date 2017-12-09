defmodule Teebox.Persistance.OauthApplicationUserRepository do
  use Teebox.Persistance.BaseRepository
  alias Teebox.Accounts.OauthApplicationUser

  def find_by_name(name) do
    Teebox.Repo.get_by(OauthApplicationUser, %{name: name})
  end
end
