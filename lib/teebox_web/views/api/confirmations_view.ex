defmodule TeeboxWeb.Api.ConfirmationsView do
  use TeeboxWeb, :view

  def render("confirmation.json", %{message: message}) do
    %{message: message}
  end

  def render("resend_confirmation.json", %{message: message}) do
    %{message: message}
  end
end
