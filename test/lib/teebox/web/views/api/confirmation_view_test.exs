defmodule Teebox.Web.Api.ConfirmationsViewTest do
  use Teebox.Web.ConnCase, async: true

  @message "Confirmation message"
  @token "token"

  test "renders confirmation.json" do
    rendered_view = Teebox.Web.Api.ConfirmationsView.render("confirmation.json", %{access_token: @token})
    assert rendered_view == %{
      message: "Account successfully confirmed! You are now logged in",
      access_token: @token
    }
  end

  test "renders resend_confirmation.json" do
    rendered_view = Teebox.Web.Api.ConfirmationsView.render("resend_confirmation.json", %{message: @message})
    assert rendered_view == %{
      message: @message
    }
  end
end
