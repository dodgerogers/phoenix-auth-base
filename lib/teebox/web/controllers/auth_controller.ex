defmodule Teebox.Web.AuthController do
  use Teebox.Web, :controller

  plug Ueberauth

  @omni_auth_login Application.get_env(:teebox, :omni_auth_login)

  def show(conn, _params) do
    render conn, "index.html"
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    @omni_auth_login.call(auth) |> handle_callback(conn)
  end
  def callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn, _params) do
    conn |> redirect(to: auth_path(conn, :show, %{errors: hd(failure.errors).message}))
  end

  defp handle_callback({:ok, user}, conn) do
    # TODO: Move this to a helper function
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    jwt = Guardian.Plug.current_token(new_conn)
    {:ok, claims} = Guardian.Plug.claims(new_conn)
    exp = Map.get(claims, "exp")

    new_conn |> redirect(to: auth_path(new_conn, :show, %{auth_token: jwt, expiry: exp, uid: user.uid}))
  end
  defp handle_callback({:error, reason}, conn) do
    conn |> redirect(to: auth_path(conn, :show, %{errors: reason}))
  end
end
