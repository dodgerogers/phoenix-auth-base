defmodule Coherence.Responders.Json do
  use Responders.Json

  def session_create_success(conn, opts \\ %{})
  def session_create_success(conn, _opts) do
    conn
    |> put_status(201)
    |> render(:session, user: conn.assigns.current_user)
  end
end
