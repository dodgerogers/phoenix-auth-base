defmodule TeeboxWeb.Api.ConfirmationsView do
  use TeeboxWeb, :view

  def render("confirmation.json", _) do
    %{message: "Your account has been confirmed"}
  end

  def render("resend_confirmation.json", _) do
    %{message: "A confirmation email has been sent"}
  end
end
