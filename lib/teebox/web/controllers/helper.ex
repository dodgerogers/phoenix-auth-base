defmodule Teebox.Web.Controller.Helper do
  import Plug.Conn
  import Phoenix.Controller

  def render_no_content(conn, status \\ 204) do
    conn
    |> put_status(status)
    |> put_resp_header("content-type", "application/json")
    |> text("")
  end

  def render_error(conn, message, status \\ 400)
  def render_error(conn, %Ecto.Changeset{} = changeset, status) do
    conn
    |> put_status(status)
    |> render(Teebox.Web.ChangesetView, "error.json", %{changeset: changeset})
  end
  def render_error(conn, message, status) do
    conn
    |> put_status(status)
    |> render(Teebox.Web.ErrorView, "error.json", %{message: message})
  end
end
