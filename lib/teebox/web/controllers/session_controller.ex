defmodule Teebox.Web.SessionController do
  use Teebox.Web, :controller

  import Teebox.Web.Authorize
  alias Teebox.Accounts

  plug :guest_check when action in [:create]

  def create(conn, %{"session" => params}) do
    Phauxth.Confirm.Login.verify(params, Accounts, crypto: Comeonin.Pbkdf2)
    |> handle_verify_credentials(conn)
  end
  defp handle_verify_credentials({:ok, user}, conn) do
    {:ok, token, new_conn} = Teebox.Accounts.Token.sign_in(conn, user)
    render(new_conn, Teebox.Web.SessionView, "info.json", %{info: token})
  end
  defp handle_verify_credentials({:error, _message}, conn) do
    error(conn, :unauthorized, 401)
  end
end
