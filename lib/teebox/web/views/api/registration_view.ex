defmodule Teebox.Web.Api.RegistrationView do
  use Teebox.Web, :view

  def render("registration.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email
    }
  end
end
