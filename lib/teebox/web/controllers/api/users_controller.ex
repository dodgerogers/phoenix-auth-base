defmodule Teebox.Web.Api.UsersController do
  use Teebox.Web, :controller

  def me(conn, _params) do
    user =
      ExOauth2Provider.Plug.current_resource_owner(conn)
      |> Teebox.Repo.preload(:profiles)

    conn
    |> render("me.json", %{user: user})
  end
end
