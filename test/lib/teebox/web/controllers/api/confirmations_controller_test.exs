defmodule Teebox.Web.Api.ConfirmationsControllerTest do
  use Teebox.Web.ConnCase, async: true

  @email "email@email.com"
  @password to_string(Faker.Lorem.characters(8))
  @confirmation_token to_string(Faker.Lorem.characters(30))
  @valid_attrs %{
    "email" => @email,
    "password" => @password,
    "confirmation_token" => @confirmation_token
  }

  test "PUT update with valid params returns 200 success message" do
    conn = build_conn()
    |> put("/api/confirmations", %{"confirmation" => @valid_attrs})

    response = json_response(conn, 200)
    assert response["message"] == "Account successfully confirmed! You are now logged in"
  end

  test "PUT update with invalid params returns 400 and failure message" do
    conn = build_conn()
    |> put("/api/confirmations", %{"confirmation" => %{}})

    response = json_response(conn, 400)
    assert response["error"] == "Failure"
  end

  test "POST create with valid params returns 200 success message" do
    conn = build_conn()
    |> post("/api/confirmations", %{"confirmation" => @valid_attrs})

    response = json_response(conn, 200)
    assert response["message"] == "Success"
  end

  test "POST create with valid params returns 200 failure message" do
    conn = build_conn()
    |> post("/api/confirmations", %{"confirmation" => %{}})

    response = json_response(conn, 400)
    assert response["error"] == "Failure"
  end
end
