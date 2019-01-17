defmodule Teebox.Web.PageControllerTest do
  use Teebox.Web.ConnCase

  # TODO: This test fails when dist/main.html has not been built
  @tag :skip
  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ "Teebox"
  end
end
