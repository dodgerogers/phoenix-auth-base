defmodule Teebox.Web.ConfirmControllerTest do
  use Teebox.Web.ConnCase

  import Teebox.Web.AuthCase
  import Teebox.Factory

  @email "test@email.com"

  setup %{conn: conn} do
    user = create_user(%{email: @email, confirmed_at: nil})
    {:ok, %{conn: conn, user: user }}
  end

  test "confirmation succeeds for correct key", %{conn: conn, user: user} do
    conn = get(conn, confirm_path(conn, :index, key: verifcation_token(user)))
    assert json_response(conn, 200)["info"]["detail"]
  end

  test "confirmation fails for incorrect key", %{conn: conn} do
    conn = get(conn, confirm_path(conn, :index, key: "garbage"))
    assert json_response(conn, 401)["errors"]["detail"]
  end

  test "confirmation fails for incorrect email", %{conn: conn} do
    invalid_user = build(:user)
    conn = get(conn, confirm_path(conn, :index, key: verifcation_token(invalid_user)))
    assert json_response(conn, 401)["errors"]["detail"]
  end
end
