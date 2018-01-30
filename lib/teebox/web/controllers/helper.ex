defmodule Teebox.Web.Controller.Helper do
  import Plug.Conn
  import Phoenix.Controller

  def render_error(conn, message, status \\ 400) do
    conn
    |> put_status(status)
    |> render(Teebox.Web.ErrorView, "error.json", %{message: message})
  end
end
