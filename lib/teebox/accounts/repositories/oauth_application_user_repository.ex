defmodule Teebox.Accounts.Repositories.OauthApplicationUserRepository do
  use Teebox.Repositories.BaseRepository
  alias Teebox.Accounts.Schemas.OauthApplicationUser

  def find_by_name(name) do
    Teebox.Repo.get_by(OauthApplicationUser, %{name: name})
  end
end
