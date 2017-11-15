defmodule TeeboxWeb.Api.RegistrationView do
  use TeeboxWeb, :view

  def render("registration.json", %{user: user}) do
    %{
      message: "An email confirmation has been sent",
      user: %{
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  end
end
