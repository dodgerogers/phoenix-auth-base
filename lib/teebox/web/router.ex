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
    plug :put_secure_browser_headers
  end

  # pipeline :api_auth do
  #   plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  #   plug Guardian.Plug.LoadResource
  # end

  scope "/", Teebox.Web do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/auth", Teebox.Web do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    post "/identity/callback", AuthController, :identity_callback
  end

  scope "/api", Teebox.Web do
    pipe_through :api

    get "/validate_token", TokensController, :validate_token
  end
end
