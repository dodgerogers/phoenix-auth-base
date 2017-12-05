defmodule TeeboxWeb.Api.TokenController do
  use TeeboxWeb, :controller

  alias Teebox.Accounts.Applications

  @token Application.get_env(:teebox, :token)

  def create(conn, params) do
    # with {:ok, payload} <- Authenticate.call(params) do
    #   conn
    #   |> json(payload)
    # else
    #   {:error, error} ->
    #     conn
    #     |> put_status(400)
    #     |> render(TeeboxWeb.ErrorView, "error.json", %{message: error})
    #   {:error, error, status} ->
    #     conn
    #     |> put_status(status)
    #     |> render(TeeboxWeb.ErrorView, "error.json", %{message: error})
    # end
  end
end
