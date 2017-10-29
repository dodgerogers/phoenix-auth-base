defmodule Teebox.Web.UserController do
  use Teebox.Web, :controller

  import Teebox.Web.Authorize
  alias Phauxth.Log
  alias Teebox.Accounts

  action_fallback Teebox.Web.FallbackController

  plug :user_check when action in [:index, :show]
  plug :id_check when action in [:update, :delete]

  # TODO: Delete what is not neccessary 
  def index(conn, _) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => %{"email" => email} = user_params}) do
    with {:ok, user} <- Accounts.create_user(user_params) do
      {:ok, token} = Teebox.Accounts.Token.verification_token(user)
      Log.info(%Log{user: user.id, message: "user created"})
      Accounts.Message.confirm_request(email, token)
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    {:ok, current_user} = current_resource(conn)
    user = id == to_string(current_user.id) and current_user || Accounts.get(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"user" => user_params}) do
    {:ok, current_user} = current_resource(conn)
    with {:ok, user} <- Accounts.update_user(current_user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, _) do
    {:ok, current_user} = current_resource(conn)
    {:ok, _user} = Accounts.delete_user(current_user)
    send_resp(conn, :no_content, "")
  end
end
