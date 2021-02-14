defmodule Teebox.Web.Api.ProfileView do
  use Teebox.Web, :view

  def render("profile.json", %{profile: profile}) do
    %{
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar
    }
  end

  def render("profiles.json", %{profiles: profiles}) do
    %{
      profiles: render_many(profiles, Teebox.Web.Api.ProfileView, "profile.json")
    }
  end
end
