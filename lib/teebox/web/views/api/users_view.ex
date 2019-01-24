defmodule Teebox.Web.Api.UsersView do
  use Teebox.Web, :view

  def render("me.json", %{user: user}) do
    %{
      id: user.id,
      profiles: render_many(user.profiles, Teebox.Web.Api.ProfileView, "profile.json"),
      active: user.active
    }
  end
end
