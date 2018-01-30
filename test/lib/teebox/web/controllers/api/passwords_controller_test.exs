defmodule Teebox.Web.Api.PasswordResetControllerTest do
  use Teebox.Web.ConnCase, async: true

  @email "email@email.com"
  @valid_attrs %{
    "email" => @email,
  }

  test "POST create with valid params returns 200 success message" do
    conn = build_conn()
    |> post("/api/passwords", %{"email" => @valid_attrs})

    response = json_response(conn, 200)
    assert response["message"] == "Success"
  end

  test "POST create with valid params returns 200 failure message" do
    conn = build_conn()
    |> post("/api/passwords", %{})

    response = json_response(conn, 400)
    assert response["error"] == "Failure"
  end
end
