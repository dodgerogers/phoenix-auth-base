defmodule Teebox.PageControllerTest do
  use TeeboxWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Teebox"
  end
end
