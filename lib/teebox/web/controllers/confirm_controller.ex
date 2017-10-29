defmodule Teebox.Web.ConfirmController do
  use Teebox.Web, :controller

  import Teebox.Web.Authorize
  alias Teebox.Accounts

  def index(conn, params) do
    case Phauxth.Confirm.verify(params, Accounts) do
      {:ok, user} ->
        Accounts.confirm_user(user)
        Accounts.Message.confirm_success(user.email)
        # TODO: Return an access token?
        message = "Your account has been confirmed"
        render(conn, Teebox.Web.ConfirmView, "info.json", %{info: message})
      {:error, _message} ->
        error(conn, :unauthorized, 401)
    end
  end
end
