defmodule Teebox.PageController do
  use Teebox.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
