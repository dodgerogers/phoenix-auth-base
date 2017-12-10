defmodule TeeboxWeb.Api.UsersViewTest do
  use TeeboxWeb.ConnCase, async: true

  test "me.json" do
    user = build(:user, id: 1)

    rendered_view = TeeboxWeb.Api.UsersView.render("me.json", %{user: user})
    assert rendered_view == %{
      user: %{
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        active: user.active,
      }
    }
  end
end
