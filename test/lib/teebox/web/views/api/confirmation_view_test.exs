defmodule Teebox.Web.Api.ConfirmationsViewTest do
  use Teebox.Web.ConnCase, async: true

  @message "Confirmation message"

  test "renders confirmation.json" do
    rendered_view = Teebox.Web.Api.ConfirmationsView.render("confirmation.json", %{message: @message})
    assert rendered_view == %{
      message: @message
    }
  end

  test "renders resend_confirmation.json" do
    rendered_view = Teebox.Web.Api.ConfirmationsView.render("resend_confirmation.json", %{message: @message})
    assert rendered_view == %{
      message: @message
    }
  end
end
