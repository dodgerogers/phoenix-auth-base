defmodule TeeboxWeb.Api.TokenControllerTest do
  use TeeboxWeb.ConnCase

  @valid_attrs %{
    client_id: "something",
    username: "email@email.com",
    password: "Pword12345678!$%",
    grant_type: "password",
  }

  test "POST create with valid params returns access code" do
    conn = build_conn()
    |> post("/api/oauth/token", @valid_attrs)

    response = json_response(conn, 200)
    assert response["code"]
  end

  test "POST create with invalid params returns 400 and error code" do
    conn = build_conn()
    |> post("/api/oauth/token", %{})

    response = json_response(conn, 400)
    assert response["error"] == "Failure"
  end
end
