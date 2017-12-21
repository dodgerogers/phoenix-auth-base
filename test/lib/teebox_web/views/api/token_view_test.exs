defmodule TeeboxWeb.Api.TokenViewTest do
  use TeeboxWeb.ConnCase, async: true

  test "renders token.json" do
    mock_token = %{code: %{token: "token"}}

    rendered_view = TeeboxWeb.Api.TokenView.render("token.json", %{access_token: mock_token})
    assert rendered_view == %{
      message: "Logged in successfully!",
      access_token: mock_token
    }
  end

  test "renders revoke.json" do
    rendered_view = TeeboxWeb.Api.TokenView.render("revoke.json", %{})
    assert rendered_view == %{
      message: "Logged out successfully!",
    }
  end
end
