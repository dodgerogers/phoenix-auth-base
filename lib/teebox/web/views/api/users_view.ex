defmodule Teebox.Web.Api.UsersView do
  use Teebox.Web, :view

  def render("current_user.json", %{user: user}) do
    %{
      id: user.id,
      active: user.active
    }
  end
end
