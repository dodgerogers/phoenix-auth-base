defmodule TeeboxWeb.Api.ConfirmationsController do
  use TeeboxWeb, :controller

  @confirmation Application.get_env(:teebox, :confirmation)

  def update(conn, %{"confirmation" => params}) do
    with {:ok, _} <- @confirmation.confirm!(params) do
      conn
      |> render("confirmation.json", %{})
    else
      {:error, message} ->
        conn
        |> put_status(:bad_request)
        |> render(TeeboxWeb.ErrorView, "error.json", %{message: message})
    end
  end
end
