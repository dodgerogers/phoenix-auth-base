defmodule Teebox.Web.Api.RegistrationControllerTest do
  use Teebox.Web.ConnCase, async: true

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
    assert response["user"]
  end

  test "POST create with invalid params returns errors" do
    conn = build_conn()
    |> post("/api/registrations", %{registration: nil})

    response = json_response(conn, 400)
    assert response["error"]
  end
end
