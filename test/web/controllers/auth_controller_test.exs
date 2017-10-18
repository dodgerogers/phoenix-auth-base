defmodule Teebox.AuthControllerTest do
  use Teebox.Web.ConnCase

  @error_message "Something went wrong"

  setup do
    success_auth = %Ueberauth.Auth{}
    failure_auth = %Ueberauth.Failure{
      errors: [
        %{message: @error_message}
      ]
    }

    {:ok, %{
      ueberauth_auth: success_auth,
      ueberauth_failure: failure_auth,
    }}
  end

  test "GET /auth/identity/callback success", %{ueberauth_auth: auth} do
    conn = build_conn()
      |> assign(:ueberauth_auth, auth)
      |> get("/auth/identity/callback")

    assert redirected_to(conn) =~ "/auth?auth_token="
  end

  test "GET /auth/identity/callback Ueberauth failure", %{ueberauth_failure: auth} do
    conn = build_conn()
      |> assign(:ueberauth_failure, auth)
      |> get("/auth/identity/callback")

    assert redirected_to(conn) =~ "/auth?errors="
  end

  test "GET /auth/identity/callback failure with invalid parameters" do
    conn = build_conn()
      |> assign(:ueberauth_auth, %{})
      |> get("/auth/identity/callback")

    assert redirected_to(conn) =~ "/auth?errors="
  end
end
