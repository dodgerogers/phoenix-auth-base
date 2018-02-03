defmodule Teebox.Web.Api.RegistrationController do
  use Teebox.Web, :controller

  @registration Application.get_env(:teebox, :registration)

  def create(conn, %{"registration" => params}) do
    with {:ok, user} <- @registration.call(params) do
      conn
      |> render("registration.json", %{user: user})
    else
      {:error, error} -> render_error(conn, error, :bad_request)
    end
  end
end
