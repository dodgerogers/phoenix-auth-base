defmodule Teebox.Web.Api.TokenViewTest do
  use Teebox.Web.ConnCase, async: true

  test "renders token.json" do
    mock_token = %{
      created_at: "created_at",
      expires_in: "expires_in",
      token_type: "token_type",
      access_token: "access_token"
    }

    rendered_view = Teebox.Web.Api.TokenView.render("token.json", %{access_token: mock_token})
    assert rendered_view == %{
      access_token: mock_token
    }
  end
end
