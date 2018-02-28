defmodule Teebox.Web.Api.PasswordResetControllerTest do
  use Teebox.Web.ConnCase, async: true

  test "POST create with valid params returns 200 success message" do
    conn = build_conn()
    |> post("/api/passwords", %{"email" => "email@email.com"})

    assert conn.status == 204
  end

  test "POST create with invalid params returns 400 and failure message" do
    conn = build_conn()
    |> post("/api/passwords", %{})

    response = json_response(conn, 400)
    assert response["error"] == %{"email" => ["can't be blank"]}
  end

  test "PUT update with valid params returns 200 success message" do
    params = %{
      "email" => "email@email.com",
      "reset_password_token" => "token",
      "password" => "password",
      "password_confirmation" => "password"
    }
    conn = build_conn()
    |> put("/api/passwords", params)

    assert conn.status == 204
  end

  test "PUT update with invalid params returns 400 and failure message" do
    conn = build_conn()
    |> put("/api/passwords", %{})

    response = json_response(conn, 400)
    assert response["error"] == %{
      "email" => ["can't be blank"],
      "password" => ["can't be blank"],
      "password_confirmation" => ["can't be blank"],
      "reset_password_token" => ["can't be blank"]
    }
  end
end
