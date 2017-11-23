defmodule TeeboxWeb.Api.ConfirmationsView do
  use TeeboxWeb, :view

  def render("confirmation.json", _) do
    %{message: "Your account has been confirmed"}
  end
end
