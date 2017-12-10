defmodule TeeboxWeb.Api.RegistrationViewTest do
  use TeeboxWeb.ConnCase, async: true

  test "renders registration.json" do
    user = build(:user, id: 1)

    rendered_view = TeeboxWeb.Api.RegistrationView.render("registration.json", %{user: user})
    assert rendered_view == %{
      message: "An email confirmation has been sent",
      user: %{
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  end
end
