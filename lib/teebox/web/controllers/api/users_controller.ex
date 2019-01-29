defmodule Teebox.Web.Api.UsersController do
  use Teebox.Web, :controller

  def show(conn, _params) do
    user = ExOauth2Provider.Plug.current_resource_owner(conn)

    conn
    |> render("current_user.json", %{user: user})
  end
end
