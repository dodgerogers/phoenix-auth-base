defmodule TeeboxWeb.Api.TokenView do
  use TeeboxWeb, :view

  def render("token.json", %{access_token: code}) do
    %{
      message: "Logged in successfully!",
      access_token: code
    }
  end

  def render("revoke.json", _) do
    %{
      message: "Logged out successfully!",
    }
  end
end
