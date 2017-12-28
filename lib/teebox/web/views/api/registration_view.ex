defmodule Teebox.Web.Api.RegistrationView do
  use Teebox.Web, :view

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
