defmodule TeeboxWeb.Api.ConfirmationsViewTest do
  use TeeboxWeb.ConnCase, async: true

  @message "Confirmation message"

  test "renders confirmation.json" do
    rendered_view = TeeboxWeb.Api.ConfirmationsView.render("confirmation.json", %{message: @message})
    assert rendered_view == %{
      message: @message
    }
  end

  test "renders resend_confirmation.json" do
    rendered_view = TeeboxWeb.Api.ConfirmationsView.render("resend_confirmation.json", %{message: @message})
    assert rendered_view == %{
      message: @message
    }
  end
end
