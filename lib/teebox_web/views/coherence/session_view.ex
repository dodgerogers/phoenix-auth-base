defmodule TeeboxWeb.Coherence.SessionView do
  use TeeboxWeb.Coherence, :view

  def render("session.json", %{user: _user, token: token}) do
    %{
      token: token
    }
  end

  def render("error.json", %{error: error}) do
    %{
      error: error
    }
  end
  def render("error.json", _opts) do
    %{
      error: "Invalid credentials"
    }
  end
end
