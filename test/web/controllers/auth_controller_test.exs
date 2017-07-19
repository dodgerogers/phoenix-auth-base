defmodule Teebox.AuthControllerTest do
  use Teebox.Web.ConnCase
  import Mock
  import Teebox.Factory

  @error_message "Something went wrong"

  setup do
    mock_user = build(:user)
    success_auth = %Ueberauth.Auth{}
    failure_auth = %Ueberauth.Failure{
      errors: [
        %{message: @error_message}
      ]
    }

    {:ok, %{
      user: mock_user,
      ueberauth_auth: success_auth,
      ueberauth_failure: failure_auth,
    }}
  end

  test "GET /auth/identity/callback success", %{ueberauth_auth: auth, user: user} do
    conn = build_conn() |> assign(:ueberauth_auth, auth)

    with_mock Teebox.Authentication.FindOrCreateOmniauthUser, [call: fn(_auth) -> {:ok, user} end] do
      conn = get(conn, "/auth/identity/callback")
      assert match?(%{"exp" => _, "jwt" => _}, json_response(conn, 200))
    end
  end

  test "GET /auth/identity/callback failure", %{ueberauth_auth: auth} do
    conn = build_conn() |> assign(:ueberauth_auth, auth)

    with_mock Teebox.Authentication.FindOrCreateOmniauthUser, [call: fn(_auth) -> {:error, @error_message} end] do
      conn = get(conn, "/auth/identity/callback")
      assert match?(%{"message" => @error_message}, json_response(conn, 400))
    end
  end

  test "GET /auth/identity/callback Ueberauth failure", %{ueberauth_failure: auth} do
    conn = build_conn() |> assign(:ueberauth_failure, auth)

    conn = get(conn, "/auth/identity/callback")

    assert match?(%{"message" => @error_message}, json_response(conn, 400))
  end
end
