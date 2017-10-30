defmodule Teebox.Web.SessionControllerTest do
  use Teebox.Web.ConnCase

  import Teebox.Web.AuthCase

  @password "reallyHard2gue$$"
  @email "robin@example.com"
  @params %{session: %{email: @email, password: @password}}

  setup %{conn: conn} do
    {:ok, %{conn: conn}}
  end

  test "login succeeds", %{conn: conn} do
    create_user(@params.session)

    conn = post conn, session_path(conn, :create), @params

    assert json_response(conn, 200)["access_token"]
  end

  test "login fails for user that is not yet confirmed", %{conn: conn} do
    create_user(Map.merge(@params.session, %{confirmed_at: nil}))

    conn = post conn, session_path(conn, :create), @params

    assert json_response(conn, 401)["errors"]["detail"] =~ "need to login"
  end

  test "login fails for user that is already logged in", %{conn: conn} do
    confirmed_user = create_user()
    conn = conn |> add_token_conn(confirmed_user)

    conn = post conn, session_path(conn, :create), @params

    assert json_response(conn, 401)["errors"]["detail"] =~ "already logged in"
  end

  test "login fails for invalid password", %{conn: conn} do
    create_user()

    conn = post conn, session_path(conn, :create), %{session: %{email: @email, password: @password <> "1"}}

    assert json_response(conn, 401)["errors"]["detail"] =~ "need to login"
  end
end
