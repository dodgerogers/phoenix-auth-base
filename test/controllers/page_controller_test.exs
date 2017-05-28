defmodule Teebox.PageControllerTest do
  use Teebox.Web.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Teebox"
  end
end
