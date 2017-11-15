defmodule TeeboxWeb.Router do
  use TeeboxWeb, :router


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

  pipeline :protected_api do
    plug :accepts, ["json"]
  end

  scope "/api" do
    pipe_through :api

    # resources "/sessions", TeeboxWeb.Api.SessionController, only: [:create]
    resources "/registrations", TeeboxWeb.Api.RegistrationController, only: [:create]
    # resources "/passwords", TeeboxWeb.Api..PasswordController, only: [:create, :update, :edit]
    # resources "/confirmations", TeeboxWeb.Api..ConfirmationController, only: [:create]
    # resources "/unlocks", TeeboxWeb.Api..UnlockController, only: [:create]
  end

  scope "/api" do
    pipe_through :protected_api

    # resources "/sessions", TeeboxWeb.Api..SessionController, only: [:destroy]
    # resources "/registrations", TeeboxWeb.Api.RegistrationController, only: [:update]
  end

  scope "/", TeeboxWeb do
    pipe_through :protected
  end

  scope "/", TeeboxWeb do
    pipe_through :browser

    get "/", PageController, :index
  end
end
