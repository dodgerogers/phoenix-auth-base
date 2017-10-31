defmodule Teebox.Web.AuthController do
  use Teebox.Web, :controller

  plug Ueberauth

  @omni_auth_login Application.get_env(:teebox, :omni_auth_login)

  def show(conn, _params) do
    render(conn, "index.html")
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    @omni_auth_login.call(auth) |> handle_callback(conn)
  end
  def callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn, _params) do
    redirect(conn, to: auth_path(conn, :show, %{errors: hd(failure.errors).message}))
  end

  defp handle_callback({:ok, _user}, conn) do
    # {:ok, token, new_conn} = Teebox.Accounts.Token.sign_in(conn, user)
    # {:ok, claims} = Teebox.Accounts.Token.claims(new_conn)
    # exp = Map.get(claims, "exp")
    #
    redirect(conn, to: auth_path(conn, :show, %{auth_token: "nope", expiry: 1500000, uid: ""}))
  end
  defp handle_callback({:error, reason}, conn) do
    redirect(conn, to: auth_path(conn, :show, %{errors: reason}))
  end
end
