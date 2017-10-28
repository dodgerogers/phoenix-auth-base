defmodule Teebox.Web.PasswordResetControllerTest do
  use Teebox.Web.ConnCase

  import Teebox.Web.AuthCase

  @email "gladys@example.com"
  @update_attrs %{email: @email, password: "^hEsdg*F899"}
  @reset_attrs %{email: @email}

  setup %{conn: conn} do
    user = create_reset_user(@reset_attrs)
    {:ok, %{conn: conn, user: user}}
  end

  test "user can create a password reset request", %{conn: conn} do
    valid_attrs = %{email: @email}
    conn = post(conn, password_reset_path(conn, :create), password_reset: valid_attrs)
    assert json_response(conn, 201)["info"]["detail"]
  end

  test "create function fails for no user", %{conn: conn} do
    invalid_attrs = %{email: "prettylady@example.com"}
    conn = post(conn, password_reset_path(conn, :create), password_reset: invalid_attrs)
    assert json_response(conn, 201)["info"]["detail"]
  end

  test "reset password succeeds for correct key", %{conn: conn} do
    valid_attrs = Map.put(@update_attrs, :key, gen_key(@email))
    reset_conn = put(conn, password_reset_path(conn, :update), password_reset: valid_attrs)
    assert json_response(reset_conn, 200)["info"]["detail"] =~ "password has been reset"
    conn = post conn, session_path(conn, :create), session: @update_attrs
    assert json_response(conn, 200)["access_token"]
  end

  test "reset password fails for incorrect key", %{conn: conn} do
    invalid_attrs = %{email: @email, password: "^hEsdg*F899", key: "garbage"}
    conn = put(conn, password_reset_path(conn, :update), password_reset: invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end
end
