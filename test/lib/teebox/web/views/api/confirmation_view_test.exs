defmodule Teebox.Web.Api.ConfirmationsViewTest do
  use Teebox.Web.ConnCase, async: true

  @token "token"

  test "renders confirmation.json" do
    rendered_view = Teebox.Web.Api.ConfirmationsView.render("confirmation.json", %{access_token: @token})
    assert rendered_view == %{
      access_token: @token
    }
  end
end
