defmodule Teebox.Web.Api.UsersViewTest do
  use Teebox.Web.ConnCase, async: true

  test "me.json" do
    user = build(:user, id: 1)

    rendered_view = Teebox.Web.Api.UsersView.render("me.json", %{user: user})
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
