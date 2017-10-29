defmodule Teebox.Accounts.Token do
  @moduledoc """
  TODO: Refactor
  The boundary for Tokens
  """

  alias Teebox.Accounts.User

  @invalid_user 'Invalid user'

  def sign_in(conn, nil), do: {:error, @invalid_user , conn}
  def sign_in(conn, user) do
    new_conn = Guardian.Plug.api_sign_in(conn, user)
    access_token = Guardian.Plug.current_token(new_conn)

    {:ok, access_token, new_conn}
  end

  def verification_token(nil), do: {:error, @invalid_user}
  def verification_token(user) do
    token = Phauxth.Token.sign(Teebox.Web.Endpoint, %{email: user.email})
    {:ok, token}
  end

  def claims(conn), do: Guardian.Plug.claims(conn)
end
