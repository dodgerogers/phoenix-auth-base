defmodule Teebox.Web.Api.PasswordsController do
  use Teebox.Web, :controller

  @forgot_password Application.get_env(:teebox, :forgot_password)

  def create(conn, params) do
    with {:ok, message} <- @forgot_password.call(params) do
      conn
      |> render("create.json", %{message: message})
    else
      {:error, message} -> render_error(conn, message)
    end
  end
end
