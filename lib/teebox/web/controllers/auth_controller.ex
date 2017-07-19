defmodule Teebox.Web.AuthController do
  use Teebox.Web, :controller
  plug Ueberauth

  def request(_conn, _params) do
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    result = Teebox.Authentication.FindOrCreateOmniauthUser.call(auth)
    handleCallback(result, conn)
  end
  def callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn, _params) do
    conn
      |> put_status(400)
      |> json(%{message: hd(failure.errors).message})
  end

  defp handleCallback({:ok, user}, conn) do
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    jwt = Guardian.Plug.current_token(new_conn)
    {:ok, claims} = Guardian.Plug.claims(new_conn)
    exp = Map.get(claims, "exp")

    new_conn
      |> put_resp_header("authorization", "Bearer #{jwt}")
      |> put_resp_header("x-expires", to_string(exp))
      |> json(%{jwt: jwt, exp: exp, user: user})
  end
  defp handleCallback({:error, reason}, conn) do
    conn
      |> put_status(400)
      |> json(%{message: reason})
  end
end
