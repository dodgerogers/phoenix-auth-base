defmodule Teebox.Web.AuthController do
  use Teebox.Web, :controller

  plug Ueberauth

  @omni_auth_login Application.get_env(:teebox, :omni_auth_login)

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    @omni_auth_login.call(auth) |> handle_callback(conn)
  end
  def callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn, _params) do
    conn
      |> put_status(400)
      |> redirect(to: page_path(conn, :index, %{errors: hd(failure.errors).message}))
  end

  defp handle_callback({:ok, user}, conn) do
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    jwt = Guardian.Plug.current_token(new_conn)
    {:ok, claims} = Guardian.Plug.claims(new_conn)
    exp = Map.get(claims, "exp")

    new_conn
      # |> put_resp_header("authorization", "Bearer #{jwt}")
      # |> put_resp_header("x-expires", to_string(exp))
      # TODO: Redirect to some other path with params
      |> redirect(to: page_path(new_conn, :index, %{auth_token: jwt, expiry: exp, uid: user.uid}))
  end
  defp handle_callback({:error, reason}, conn) do
    conn
      |> put_status(400)
      |> redirect(to: page_path(conn, :index, %{errors: reason}))
  end
end
