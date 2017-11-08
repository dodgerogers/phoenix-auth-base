defmodule TeeboxWeb.Router do
  use TeeboxWeb, :router
  use Coherence.Router

  if Mix.env == :dev do
    forward "/mailbox", Plug.Swoosh.MailboxPreview, [base_path: "/dev/mailbox"]
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
    # TODO: REMOVE when issue Coherence#296 is resolved
    plug :fetch_session
    plug :fetch_flash
    # plug Coherence.Authentication.Token, source: :header,
    #                                      store: Teebox.Coherence.TokenDbStore,
    #                                      param: "x-auth-token",
    #                                      protected: false,
    #                                      error: ~s'{"error":"authentication required"}'
  end

  pipeline :protected_api do
    plug :accepts, ["json"]
    # TODO: REMOVE when issue Coherence#296 is resolved
    plug :fetch_session
    plug :fetch_flash
    plug Coherence.Authentication.Token, source: :header,
                                         store: Teebox.Coherence.TokenDbStore,
                                         param: "x-auth-token",
                                         protected: true,
                                         error: ~s'{"error":"authentication required"}'
  end

  scope "/api", TeeboxWeb do
    pipe_through :api
    coherence_routes()
  end

  scope "/api", TeeboxWeb do
    pipe_through :protected_api
    coherence_routes :protected
    # get "/users/me", UserController, :me # TODO
  end

  scope "/", TeeboxWeb do
    pipe_through :protected
  end

  scope "/", TeeboxWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/auth", TeeboxWeb do
    pipe_through :browser

    get "/:provider", AuthController, :index
    get "/:provider/callback", AuthController, :callback
    get "/", AuthController, :show
  end
end
