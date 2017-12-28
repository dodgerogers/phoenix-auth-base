defmodule Teebox.Web.Api.UsersControllerTest do
  use Teebox.Web.ConnCase, async: true

  test "GET me with valid access token returns current user" do
    oauth_access_token = insert(:oauth_access_token)

    conn = build_conn()
    |> put_req_header("authorization", "Bearer " <> oauth_access_token.token)
    |> get("/api/users/me", %{})

    response = json_response(conn, 200)
    assert response["user"]
    assert oauth_access_token.resource_owner.id == response["user"]["id"]
  end

  test "GET me with invalid access token returns 401 and error" do
    conn = build_conn()
    |> put_req_header("authorization", "Bearer " <> Faker.String.base64())
    |> get("/api/users/me", %{})

    response = json_response(conn, 401)
    assert response["error"] == "Unauthorized"
  end
end
