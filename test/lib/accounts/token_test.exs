defmodule Teebox.Accounts.TokenTest do
  use Teebox.Web.ConnCase

  import Teebox.Factory

  @user_id 999
  @expected_claim_keys ~w(aud exp iat iss jti pem sub typ)

  setup do
    user = build(:user, id: @user_id)
    conn = build_conn()

    {:ok, %{user: user, conn: conn}}
  end

  test "sign_in returns :ok, token and new connection with valid user", %{conn: conn, user: user} do
    {:ok, token, %Plug.Conn{} = _new_conn} = Teebox.Accounts.Token.sign_in(conn, user)

    {:ok, claims} = Guardian.decode_and_verify(token)

    assert is_binary(token)
    assert Map.keys(claims) == @expected_claim_keys
    assert claims["sub"] == "data:" <> to_string(@user_id)
  end

  test "sign_in returns :error, message and connection with nil user", %{conn: conn} do
    {:error, message, %Plug.Conn{} = _new_conn} = Teebox.Accounts.Token.sign_in(conn, nil)

    assert message == "Invalid user"
  end
end
