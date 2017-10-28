defmodule Teebox.Web.Router do
  use Teebox.Web, :router

  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.SentEmailViewerPlug
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
    plug Phauxth.Authenticate, method: :token
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
    get "/", AuthController, :show
  end

  # scope "/api", Teebox.Web do
  #   pipe_through :api
  #
  #   get "/validate_token", TokensController, :validate_token
  # end

  scope "/api", Teebox.Web do
    pipe_through :api

    post "/sessions", SessionController, :create
    resources "/users", UserController, except: [:new, :edit]
    get "/confirm", ConfirmController, :index
    post "/password_resets", PasswordResetController, :create
    put "/password_resets/update", PasswordResetController, :update
  end
end
