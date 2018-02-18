defmodule Teebox.Web.Api.TokenControllerTest do
  use Teebox.Web.ConnCase, async: true

  @valid_params %{
    username: "email@email.com",
    password: "Pword12345678!$%",
    grant_type: "password"
  }

  test "POST create with valid params returns access code" do
    conn = build_conn()
    |> post("/api/oauth/token", @valid_params)

    response = json_response(conn, 200)
    assert response["access_token"]
  end

  test "POST create with invalid password grant 400 and error" do
    invalid_params = Map.merge(@valid_params, %{"grant_type" => "invalid"})
    conn = build_conn()
    |> post("/api/oauth/token", invalid_params)

    response = json_response(conn, 400)
    assert response["error"] == "Failure"
  end

  test "POST create with invalid credentials returns 401" do
    conn = build_conn()
    |> post("/api/oauth/token", %{})

    response = json_response(conn, 401)
    assert response["error"] == "Failure"
  end

  test "DELETE revoke with valid params returns 204" do
    oauth_access_token = insert(:oauth_access_token)

    conn = build_conn()
    |> put_req_header("authorization", "Bearer " <> oauth_access_token.token)
    |> delete("/api/oauth/token")

    assert conn.status == 204
  end

  test "DELETE revoke with no authentication token returns 401" do
    conn = build_conn()
    |> delete("/api/oauth/token")

    assert 401 == conn.status
  end

  test "POST refresh with valid params returns 200 and access token" do
    oauth_access_token = insert(:oauth_access_token)

    conn = build_conn()
    |> put_req_header("authorization", "Bearer " <> oauth_access_token.token)
    |> post("/api/oauth/token/refresh")

    response = json_response(conn, 200)
    assert response["access_token"]
  end

  test "POST refresh with no authentication token returns 401" do
    conn = build_conn()
    |> post("/api/oauth/token/refresh")

    assert 401 == conn.status
  end
end
