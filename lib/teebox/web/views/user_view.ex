defmodule Teebox.Web.UserView do
  use Teebox.Web, :view
  alias Teebox.Web.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    Map.from_struct(user)
    |> Map.take([:id, :name, :avatar, :uid, :confirmed_at])
  end
end