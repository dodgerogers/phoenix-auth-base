defmodule Teebox.Web.Router do
  use Teebox.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Teebox.Web do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/auth", Teebox.Web do
    pipe_through :browser

    get "/:provider", Teebox.Web.AuthController, :request
    get "/:provider/callback", Teebox.Web.AuthController, :callback
    post "/identity/callback", Teebox.Web.AuthController, :identity_callback
  end
end
