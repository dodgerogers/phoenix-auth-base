defmodule Teebox.Web.Api.BaseView do
  use Teebox.Web, :view

  def render("empty.json", _) do
    %{}
  end
end
