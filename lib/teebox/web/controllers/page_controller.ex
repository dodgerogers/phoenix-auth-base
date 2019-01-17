defmodule Teebox.Web.PageController do
  use Teebox.Web, :controller

  # Render the main.html file created by the front end
  def index(conn, _params) do
    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(
      200,
      static_path(
        conn,
        Application.app_dir(:teebox, static_path(conn, "/priv/static/dist/main.html"))
      )
    )
  end
end
