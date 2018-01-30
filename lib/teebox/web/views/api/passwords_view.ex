defmodule Teebox.Web.Api.PasswordsView do
  use Teebox.Web, :view

  def render("create.json", %{message: message}) do
    %{
      message: message
    }
  end
end
