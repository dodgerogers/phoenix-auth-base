defmodule TeeboxWeb.Api.TokenController do
  use TeeboxWeb, :controller

  @authenticate Application.get_env(:teebox, :authenticate)

  def create(conn, params) do
    with {:ok, access_token} <- @authenticate.call(params) do
      conn
      |> render("token.json", %{access_token: access_token})
    else
      {:error, error, status} ->
        conn
        |> put_status(status)
        |> render(TeeboxWeb.ErrorView, "error.json", %{message: error})
      {:error, error} ->
        conn
        |> put_status(400)
        |> render(TeeboxWeb.ErrorView, "error.json", %{message: error})
    end
  end
end
