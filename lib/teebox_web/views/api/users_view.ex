defmodule TeeboxWeb.Api.UsersView do
  use TeeboxWeb, :view

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
