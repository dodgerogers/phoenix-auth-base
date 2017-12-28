defmodule Teebox.Web.Api.ConfirmationsView do
  use Teebox.Web, :view

  def render("confirmation.json", %{message: message}) do
    %{message: message}
  end

  def render("resend_confirmation.json", %{message: message}) do
    %{message: message}
  end
end
