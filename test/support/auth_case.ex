defmodule TeeboxWeb.AuthCase do
  use Phoenix.ConnTest

  import Teebox.Factory

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
    {:ok, _token, new_conn} = Teebox.Accounts.Token.sign_in(conn, user)
    new_conn
    |> put_req_header("accept", "application/json")
  end

  # TODO: Label this better, reset password key, confirmation key
  def verifcation_token(user) do
    {:ok, token} = Teebox.Accounts.Token.verification_token(user)
    token
  end
end
