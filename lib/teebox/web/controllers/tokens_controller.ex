defmodule Teebox.Web.TokensController do
  use Teebox.Web, :controller

  alias Teebox.User

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.LoadResource

  def validate_token(conn, _params) do
    render_resource(conn, Guardian.Plug.current_resource(conn))
  end

  defp render_resource(conn, %User{} = user) do
    conn
      |> put_status(200)
      |> json(%{data: user, success: true})
  end
  defp render_resource(conn, _) do
    conn
      |> put_status(400)
      |> json(%{errors: "Invalid token", success: false})
  end
end
