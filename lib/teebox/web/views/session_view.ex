defmodule Teebox.Web.SessionView do
  use Teebox.Web, :view

  def render("info.json", %{info: token}) do
    %{access_token: token}
  end
end
