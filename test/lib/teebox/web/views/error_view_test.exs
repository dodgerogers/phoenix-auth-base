defmodule Teebox.Web.ErrorViewTest do
  use Teebox.Web.ConnCase, async: true

  test "renders 401.json" do
    assert Teebox.Web.ErrorView.render("401.json", []) == %{error: "Unauthorized"}
  end

  test "renders 404.json" do
    assert Teebox.Web.ErrorView.render("404.json", []) == %{error: "Page not found"}
  end

  test "render 500.json" do
    assert Teebox.Web.ErrorView.render("500.json", []) == %{error: "Internal server error"}
  end

  test "render any other" do
    assert Teebox.Web.ErrorView.render("505.json", []) == %{error: "Internal server error"}
  end
end
