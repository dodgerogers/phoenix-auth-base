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
  end

  scope "/api" do
    pipe_through :api

    # resources "/sessions", TeeboxWeb.Api.SessionController, only: [:create]
    resources "/registrations", TeeboxWeb.Api.RegistrationController, only: [:create]
    # resources "/passwords", TeeboxWeb.Api..PasswordController, only: [:create, :update, :edit]
    put "/confirmations", TeeboxWeb.Api.ConfirmationsController, :update
    # resources "/unlocks", TeeboxWeb.Api..UnlockController, only: [:create]
  end

  scope "/", TeeboxWeb do
    pipe_through :browser

    get "/", PageController, :index
  end
end
