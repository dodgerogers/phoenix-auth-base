defmodule Teebox.Web.Api.ConfirmationsController do
  use Teebox.Web, :controller

  alias Teebox.Web.Validators.{ConfirmationUpdate, ConfirmationCreate}

  plug ValidateParams, {ConfirmationUpdate, :call} when action == :update
  plug ValidateParams, {ConfirmationCreate, :call} when action == :create

  @confirm_and_authenticate Application.get_env(:teebox, :confirm_and_authenticate)
  @confirmation Application.get_env(:teebox, :confirmation)

  def update(conn, params) do
    with {:ok, access_token} <- @confirm_and_authenticate.call(params) do
      conn
      |> render("confirmation.json", %{access_token: access_token})
    else
      {:error, message} -> render_error(conn, message)
    end
  end

  def create(conn, params) do
    with {:ok, _} <- @confirmation.resend_confirmation(params) do
      conn
      |> render_no_content()
    else
      {:error, message} -> render_error(conn, message)
    end
  end
end
