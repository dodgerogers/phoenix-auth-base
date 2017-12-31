defmodule Teebox.Web.Api.ConfirmationsController do
  use Teebox.Web, :controller

  @confirm_and_sign_in_user Application.get_env(:teebox, :confirm_and_sign_in_user)
  @confirmation Application.get_env(:teebox, :confirmation)

  def update(conn, %{"confirmation" => params}) do
    with {:ok, access_token} <- @confirm_and_sign_in_user.call(params) do
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

  defp render_error(conn, message) do
    conn
    |> put_status(:bad_request)
    |> render(Teebox.Web.ErrorView, "error.json", %{message: message})
  end
end
