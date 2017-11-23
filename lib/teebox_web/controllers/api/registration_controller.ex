defmodule TeeboxWeb.Api.RegistrationController do
  use TeeboxWeb, :controller

  @registration Application.get_env(:teebox, :registration)

  def create(conn, %{"registration" => params}) do
    with {:ok, user} <- @registration.call(params) do
      conn
      |> render("registration.json", %{user: user})
    else
      {:error, changeset} ->
        conn
        |> put_status(:bad_request)
        |> render(TeeboxWeb.ChangesetView, "error.json", %{changeset: changeset})
    end
  end
end
