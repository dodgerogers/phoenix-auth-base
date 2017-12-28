defmodule Teebox.Web.Api.ConfirmationsController do
  use Teebox.Web, :controller

  @confirmation Application.get_env(:teebox, :confirmation)

  # TODO: Return access token
  def update(conn, %{"confirmation" => params}) do
    with {:ok, message} <- @confirmation.confirm!(params) do
      conn
      |> render("confirmation.json", %{message: message})
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
