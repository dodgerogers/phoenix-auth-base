defmodule Teebox.Web.Api.ProfilesController do
  use Teebox.Web, :controller

  alias Teebox.Accounts.Schemas.Profile

  def index(conn, _params) do
    user = ExOauth2Provider.Plug.current_resource_owner(conn)
    profiles = Teebox.Repo.all(Profile, user_id: user.id)

    conn
    |> render("profiles.json", %{profiles: profiles})
  end
end
