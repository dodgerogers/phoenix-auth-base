defmodule Teebox.Web.Api.PasswordsController do
  use Teebox.Web, :controller

  @generate_password_reset Application.get_env(:teebox, :generate_password_reset)

  def create(conn, params) do
    with {:ok, message} <- @generate_password_reset.call(params) do
      conn
      |> render("create.json", %{message: message})
    else
      {:error, message} -> render_error(conn, message)
    end
  end
end
