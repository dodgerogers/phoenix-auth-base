defmodule Teebox.Web.Api.UsersView do
  use Teebox.Web, :view

  def render("me.json", %{user: user}) do
    %{
      user: %{
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        active: user.active
      }
    }
  end
end
