defmodule Teebox.Web.Api.ProfileView do
  use Teebox.Web, :view

  def render("profile.json", %{profile: profile}) do
    %{
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar
    }
  end
end
