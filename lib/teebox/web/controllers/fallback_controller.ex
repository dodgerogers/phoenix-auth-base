defmodule Teebox.Web.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use Teebox.Web, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(Teebox.Web.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(Teebox.Web.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, _}) do
    conn
    |> put_status(:internal_server_error)
    |> put_view(Teebox.Web.ErrorView)
    |> render(:"500")
  end

  def unauthenticated(conn, _params) do
    conn
    |> put_status(:unauthorized)
    |> put_view(Teebox.Web.ErrorView)
    |> render("401.json")
  end
end
