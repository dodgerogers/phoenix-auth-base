defmodule Teebox.Web.Api.ConfirmationsController do
  use Teebox.Web, :controller

  @confirm_and_authenticate Application.get_env(:teebox, :confirm_and_authenticate)
  @confirmation Application.get_env(:teebox, :confirmation)

  def update(conn, %{"confirmation" => params}) do
    with {:ok, access_token} <- @confirm_and_authenticate.call(params) do
      conn
      |> render("confirmation.json", %{access_token: access_token})
    else
      {:error, message} -> render_error(conn, message)
    end
  end

  def create(conn, %{"confirmation" => params}) do
    with {:ok, message} <- @confirmation.resend_confirmation(params) do
      conn
      |> render("resend_confirmation.json", %{message: message})
    else
      {:error, message} -> render_error(conn, message)
    end
  end
end
