defmodule Teebox.Web.Api.RegistrationViewTest do
  use Teebox.Web.ConnCase, async: true

  test "renders registration.json" do
    user = build(:user, id: 1)

    rendered_view = Teebox.Web.Api.RegistrationView.render("registration.json", %{user: user})

    assert rendered_view == %{
             id: user.id,
             email: user.email
           }
  end
end
