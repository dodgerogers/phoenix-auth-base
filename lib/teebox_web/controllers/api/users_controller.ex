defmodule TeeboxWeb.Api.UsersController do
  use TeeboxWeb, :controller

  def me(conn, _params) do
    user = ExOauth2Provider.Plug.current_resource_owner(conn)
    conn
    |> render("me.json", %{user: user})
  end
end
