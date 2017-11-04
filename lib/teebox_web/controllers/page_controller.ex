defmodule TeeboxWeb.PageController do
  use TeeboxWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
