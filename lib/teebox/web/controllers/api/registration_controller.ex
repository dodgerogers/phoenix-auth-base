defmodule Teebox.Web.Api.RegistrationController do
  use Teebox.Web, :controller

  alias Teebox.Web.Validators.RegistrationCreate

  plug ValidateParams, {RegistrationCreate, :call} when action in [:create]

  def create(conn, params) do
    registration = Application.get_env(:teebox, :registration)
    with {:ok, user} <- registration.call(params) do
      conn
      |> render("registration.json", %{user: user})
    else
      {:error, error} -> render_error(conn, error, :bad_request)
    end
  end
end
