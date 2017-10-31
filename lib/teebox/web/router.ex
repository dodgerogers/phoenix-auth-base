defmodule Teebox.Web.Router do
  use Teebox.Web, :router

  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.EmailPreviewPlug
  end

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
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/auth", Teebox.Web do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    get "/", AuthController, :show
  end

  scope "/api", Teebox.Web do
    pipe_through :api

    get     "/apps", AppController, :index
    get     "/apps/:id", AppController, :show
    delete  "/apps/:id", AppController, :delete
    post    "/apps/authorize", AppController, :authorize

    get     "/tokens/:id", TokenController, :show
    post    "/tokens", TokenController, :create

    post    "/users/register", UserController, :register
    post    "/users/login", UserController, :login
    delete  "/users/logout", UserController, :logout
    get     "/users/me", UserController, :me
    get     "/users/confirm", UserController, :confirm
    post    "/users/recover_password", UserController, :recover_password
    post    "/users/reset_password", UserController, :reset_password
    post    "/users/change_password", UserController, :change_password

    get     "/settings", SettingController, :index
    put     "/settings/:id", SettingController, :update
    patch   "/settings/:id", SettingController, :update
  end
end
