defmodule Teebox.Web.Api.ConfirmationsView do
  use Teebox.Web, :view

  def render("confirmation.json", %{access_token: access_token}) do
    %{
      message: "Account successfully confirmed! You are now logged in",
      access_token: access_token
    }
  end

  def render("resend_confirmation.json", %{message: message}) do
    %{message: message}
  end
end
