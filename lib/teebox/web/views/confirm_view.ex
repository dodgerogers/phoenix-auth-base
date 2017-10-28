defmodule Teebox.Web.ConfirmView do
  use Teebox.Web, :view

  def render("info.json", %{info: message}) do
    %{info: %{detail: message}}
  end
end
