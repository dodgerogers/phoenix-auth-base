defmodule TeeboxWeb.Api.RegistrationControllerTest do
  use TeeboxWeb.ConnCase

  @password "Pword12345678!$%"
  @valid_attrs %{
    name: "Bob",
    email: "email@email.com",
    password: @password,
    password_confirmation: @password
  }

  test "POST create with valid params returns message and user" do
    conn = build_conn()
    |> post("/api/registrations", %{registration: @valid_attrs})

    response = json_response(conn, 200)
    user = response["user"]
    assert user["email"] == @valid_attrs.email
    assert user["name"] == @valid_attrs.name
    assert response["message"] == "An email confirmation has been sent"
  end

  test "POST create with invalid params returns errors" do
    invalid_attrs = @valid_attrs |> Map.merge(%{email: ""})

    conn = build_conn()
    |> post("/api/registrations", %{registration: invalid_attrs})

    response = json_response(conn, 400)
    assert response["error"] == %{
      "email" => ["can't be blank"],
    }
  end
end
