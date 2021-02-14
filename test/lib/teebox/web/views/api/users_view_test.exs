defmodule Teebox.Web.Api.UsersViewTest do
  use Teebox.Web.ConnCase, async: true

  test "me.json" do
    user = insert(:user)

    rendered_view = Teebox.Web.Api.UsersView.render("current_user.json", %{user: user})

    assert rendered_view == %{
             id: user.id,
             active: user.active
           }
  end
end
