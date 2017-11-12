defmodule TeeboxWeb.Coherence.SessionView do
  use TeeboxWeb.Coherence, :view

  def render("session.json", %{ user: user }) do
    %{
      id: user.id,
      name: user.name
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
