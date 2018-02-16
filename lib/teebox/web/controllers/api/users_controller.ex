defmodule Teebox.Web.Api.UsersController do
  use Teebox.Web, :controller

  def me(conn, _params) do
    user = ExOauth2Provider.Plug.current_resource_owner(conn)
    conn
    |> render("me.json", %{user: user})
  end

  def test(conn, _params) do
    user = ExOauth2Provider.Plug.current_resource_owner(conn)
    conn
    |> render("me.json", %{user: user})
  end
end
