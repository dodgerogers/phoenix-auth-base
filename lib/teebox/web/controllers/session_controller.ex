defmodule Teebox.Web.SessionController do
  use Teebox.Web, :controller

  import Teebox.Web.Authorize
  alias Teebox.Accounts

  plug :guest_check when action in [:create]

  # If you are using Argon2 or Pbkdf2, add crypto: Comeonin.Argon2
  # or crypto: Comeonin.Pbkdf2 to Login.verify (after Accounts)
  def create(conn, %{"session" => params}) do
    case Phauxth.Confirm.Login.verify(params, Accounts, crypto: Comeonin.Pbkdf2) do
      {:ok, user} ->
        token = Phauxth.Token.sign(conn, user.id)
        render(conn, Teebox.Web.SessionView, "info.json", %{info: token})
      {:error, message} ->
        error(conn, :unauthorized, 401)
    end
  end
end
