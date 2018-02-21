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
    |> put("/api/confirmations", @valid_attrs)

    assert json_response(conn, 200)
  end

  test "PUT update with invalid params returns 400 and failure message" do
    conn = build_conn()
    |> put("/api/confirmations", %{})

    body = json_response(conn, 400)
    assert body == %{
      "error" => %{
        "email" => ["can't be blank"],
        "password" => ["can't be blank"],
        "confirmation_token" => ["can't be blank"]
      }
    }
  end

  test "POST create with valid params returns 200 success message" do
    conn = build_conn()
    |> post("/api/confirmations", @valid_attrs)

    assert conn.status == 204
  end

  test "POST create with valid params returns 200 failure message" do
    conn = build_conn()
    |> post("/api/confirmations", %{})

    body = json_response(conn, 400)
    assert body == %{
      "error" => %{
        "email" => ["can't be blank"]
      }
    }
  end
end
