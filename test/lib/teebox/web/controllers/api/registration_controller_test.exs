defmodule Teebox.Web.Api.RegistrationControllerTest do
  use Teebox.Web.ConnCase, async: true

  @password "Pword12345678!$%"
  @valid_attrs %{
    name: "Bob",
    email: "email@email.com",
    password: @password,
    password_confirmation: @password
  }

  @invalid_attrs %{
    name: 1,
    email: nil,
    password: to_string(Faker.Lorem.characters(255)),
    password_confirmation: ""
  }

  test "POST create with valid params returns message and user" do
    conn = build_conn()
    |> post("/api/registrations", @valid_attrs)

    body = json_response(conn, 200)
    assert body["user"]
  end

  test "POST create with invalid params returns errors" do
    conn = build_conn()
    |> post("/api/registrations", @invalid_attrs)

    body = json_response(conn, 400)
    assert body == %{
      "error" => %{
        "email" => ["can't be blank"],
        "name" => ["is invalid"],
        "password" => ["should be at most 254 character(s)"],
        "password_confirmation" => ["can't be blank"]
      }
    }
  end
end
