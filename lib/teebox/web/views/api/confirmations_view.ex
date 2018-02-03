defmodule Teebox.Web.Api.ConfirmationsView do
  use Teebox.Web, :view

  def render("confirmation.json", %{access_token: access_token}) do
    %{
      access_token: access_token
    }
  end
end
