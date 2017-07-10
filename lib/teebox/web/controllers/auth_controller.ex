defmodule Teebox.Web.AuthController do
  use Teebox.Web, :controller
  plug Ueberauth

  def request(_conn, _params) do
  end

  def callback(_conn, _params) do
  end

  def identity_callback(_conn, _params) do
  end
end
