defmodule Teebox.Web.ConfirmControllerTest do
  use Teebox.Web.ConnCase

  import Teebox.Web.AuthCase

  @email "test@email.com"

  setup %{conn: conn} do
    create_user(%{email: @email, confirmed_at: nil})
    {:ok, %{conn: conn}}
  end

  test "confirmation succeeds for correct key", %{conn: conn} do
    conn = get(conn, confirm_path(conn, :index, key: gen_key(@email)))
    assert json_response(conn, 200)["info"]["detail"]
  end

  test "confirmation fails for incorrect key", %{conn: conn} do
    conn = get(conn, confirm_path(conn, :index, key: "garbage"))
    assert json_response(conn, 401)["errors"]["detail"]
  end

  test "confirmation fails for incorrect email", %{conn: conn} do
    conn = get(conn, confirm_path(conn, :index, key: gen_key(@email <> "1")))
    assert json_response(conn, 401)["errors"]["detail"]
  end
end
