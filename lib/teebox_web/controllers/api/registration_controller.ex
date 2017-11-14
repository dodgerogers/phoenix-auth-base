defmodule TeeboxWeb.Api.RegistrationController do
  use TeeboxWeb, :controller

  def create(conn, %{"session" => params}) do
    with {:ok, user} <- Teebox.Accounts.Registration.call(params) do
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
