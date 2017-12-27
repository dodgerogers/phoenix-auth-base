defmodule TeeboxWeb.Router do
  use TeeboxWeb, :router

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
    plug ExOauth2Provider.Plug.EnsureAuthenticated, handler: TeeboxWeb.FallbackController
  end

  scope "/api" do
    pipe_through :api

    post "/oauth/token", TeeboxWeb.Api.TokenController, :create
    resources "/registrations", TeeboxWeb.Api.RegistrationController, only: [:create]
    put "/confirmations", TeeboxWeb.Api.ConfirmationsController, :update
    post "/confirmations", TeeboxWeb.Api.ConfirmationsController, :create
    # resources "/passwords", TeeboxWeb.Api.PasswordController, only: [:create, :update, :edit]
  end

  scope "/api" do
    pipe_through :authenticated_api

    get "/users/me", TeeboxWeb.Api.UsersController, :me
    delete "/oauth/token", TeeboxWeb.Api.TokenController, :revoke
  end

  scope "/", TeeboxWeb do
    pipe_through :browser

    get "/", PageController, :index
  end
end
