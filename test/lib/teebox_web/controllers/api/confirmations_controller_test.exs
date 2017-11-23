defmodule TeeboxWeb.Api.ConfirmationsControllerTest do
  use TeeboxWeb.ConnCase

  @email "email@email.com"
  @confirmation_token to_string(Faker.Lorem.characters(30))
  @valid_attrs %{
    "email" => @email,
    "confirmation_token" => @confirmation_token
  }

  test "PUT update with valid params returns 200 success message" do
    conn = build_conn()
    |> put("/api/confirmations", %{"confirmation" => @valid_attrs})

    response = json_response(conn, 200)
    assert response["message"] == "Your account has been confirmed"
  end

  test "PUT update with invalid params returns 400 and failure message" do
    conn = build_conn()
    |> put("/api/confirmations", %{"confirmation" => %{}})

    response = json_response(conn, 400)
    assert response["error"] == "User not confirmed"
  end
end
