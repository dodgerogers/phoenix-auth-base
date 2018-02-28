defmodule Teebox.Web.Api.PasswordsController do
  use Teebox.Web, :controller

  alias Teebox.Web.Validators.{PasswordCreate, PasswordUpdate}

  plug ValidateParams, {PasswordCreate, :call} when action == :create
  plug ValidateParams, {PasswordUpdate, :call} when action == :update

  @forgot_password Application.get_env(:teebox, :forgot_password)
  @reset_password Application.get_env(:teebox, :reset_password)

  def create(conn, params) do
    with {:ok} <- @forgot_password.call(params) do
      conn
      |> render_no_content()
    else
      {:error, message} -> render_error(conn, message)
    end
  end

  def update(conn, params) do
    with {:ok} <- @reset_password.call(params) do
      conn
      |> render_no_content()
    else
      {:error, error} -> render_error(conn, error)
    end
  end
end
