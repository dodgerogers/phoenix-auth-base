defmodule Teebox.Web.Api.TokenView do
  use Teebox.Web, :view

  def render("token.json", %{access_token: code}) do
    %{
      access_token: code
    }
  end
end
