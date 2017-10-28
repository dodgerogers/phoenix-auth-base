defmodule Teebox.Web.AuthCase do
  use Phoenix.ConnTest

  import Teebox.Factory
  alias Teebox.Accounts

  def build_user(user \\ %{}) do
    build(:user, user) |> set_password()
  end

  def create_user(user \\ %{}) do
    build_user(user) |> insert
  end

  def set_password(user) do
    password = user.password || Faker.Lorem.words(8..20)
    %{user | password_hash: Comeonin.Pbkdf2.hashpwsalt(password)}
  end

  def create_reset_user(user \\ %{}) do
    Map.merge(user, %{reset_sent_at: DateTime.utc_now, confirmed_at: DateTime.utc_now})
    |> create_user()
  end

  def add_token_conn(conn, user) do
    user_token = Phauxth.Token.sign(Teebox.Web.Endpoint, user.id)
    conn
    |> put_req_header("accept", "application/json")
    |> put_req_header("authorization", user_token)
  end

  def gen_key(email) do
    Phauxth.Token.sign(Teebox.Web.Endpoint, %{"email" => email})
  end
end
