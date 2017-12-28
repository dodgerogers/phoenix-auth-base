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
    plug ExOauth2Provider.Plug.VerifyHeader, realm: "Bearer"
  end

  pipeline :authenticated_api do
    plug :api
    plug ExOauth2Provider.Plug.EnsureAuthenticated, handler: Teebox.Web.FallbackController
  end

  scope "/api" do
    pipe_through :api

    post "/oauth/token", Teebox.Web.Api.TokenController, :create
    resources "/registrations", Teebox.Web.Api.RegistrationController, only: [:create]
    put "/confirmations", Teebox.Web.Api.ConfirmationsController, :update
    post "/confirmations", Teebox.Web.Api.ConfirmationsController, :create
    # resources "/passwords", Teebox.Web.Api.PasswordController, only: [:create, :update, :edit]
  end

  scope "/api" do
    pipe_through :authenticated_api

    get "/users/me", Teebox.Web.Api.UsersController, :me
    delete "/oauth/token", Teebox.Web.Api.TokenController, :revoke
  end

  scope "/", Teebox.Web do
    pipe_through :browser

    get "/", PageController, :index
  end
end
