defmodule Teebox.Web.Api.UsersViewTest do
  use Teebox.Web.ConnCase, async: true

  test "me.json" do
    user = insert(:user) |> with_profile()
    user = Teebox.Repo.preload(user, :profiles)

    rendered_view = Teebox.Web.Api.UsersView.render("me.json", %{user: user})

    expected_profiles =
      Enum.map(user.profiles, fn p -> %{avatar: p.avatar, id: p.id, name: p.name} end)

    assert rendered_view == %{
             id: user.id,
             profiles: expected_profiles,
             active: user.active
           }
  end
end
