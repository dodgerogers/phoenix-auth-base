defmodule Teebox.Web.Api.TokenView do
  use Teebox.Web, :view

  def render("token.json", %{access_token: token}) do
    %{
      access_token: %{
        created_at: token.created_at,
        expires_in: token.expires_in,
        token_type: token.token_type,
        access_token: token.access_token
      }
    }
  end
end
