defmodule Teebox.Web.PasswordResetController do
  use Teebox.Web, :controller
  alias Teebox.Accounts

  def create(conn, %{"password_reset" => %{"email" => email}}) do
    # TODO: Put message sending into the create password reset
    token = Accounts.create_password_reset(%{"email" => email})
    Accounts.Message.reset_request(email, token)
    message = "Check your inbox for instructions on how to reset your password"
    conn
    |> put_status(:created)
    |> render(Teebox.Web.PasswordResetView, "info.json", %{info: message})
  end

  def update(conn, %{"password_reset" => params}) do
    case Phauxth.Confirm.verify(params, Accounts, mode: :pass_reset) do
      # TODO Separate functions
      {:ok, user} ->
        Accounts.update_password(user, params) |> update_password(conn, params)
      {:error, message} ->
        put_status(conn, :unprocessable_entity)
        |> render(Teebox.Web.PasswordResetView, "error.json", error: message)
    end
  end

  defp update_password({:ok, user}, conn, _params) do
    # Do not do this messaging here
    Accounts.Message.reset_success(user.email)
    message = "Your password has been reset"
    render(conn, Teebox.Web.PasswordResetView, "info.json", %{info: message})
  end
  defp update_password({:error, %Ecto.Changeset{} = changeset}, conn, _params) do
    message = with p <- changeset.errors[:password], do: elem(p, 0)
    put_status(conn, :unprocessable_entity)
    |> render(Teebox.Web.PasswordResetView, "error.json", error: message || "Invalid input")
  end
end
