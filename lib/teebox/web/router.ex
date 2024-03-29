defmodule Teebox.Web.Router do
  use Teebox.Web, :router

  if Mix.env() == :dev do
    forward("/sent_emails", Bamboo.EmailPreviewPlug)
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:put_format, :json)
    plug(ExOauth2Provider.Plug.VerifyHeader, realm: "Bearer")
  end

  pipeline :authenticated_api do
    plug(:api)
    plug(ExOauth2Provider.Plug.EnsureAuthenticated, handler: Teebox.Web.FallbackController)
  end

  scope "/api" do
    pipe_through(:api)

    post("/oauth/token", Teebox.Web.Api.TokenController, :create)
    resources("/registrations", Teebox.Web.Api.RegistrationController, only: [:create])
    put("/confirmations", Teebox.Web.Api.ConfirmationsController, :update)
    post("/confirmations", Teebox.Web.Api.ConfirmationsController, :create)
    post("/passwords", Teebox.Web.Api.PasswordsController, :create)
    put("/passwords", Teebox.Web.Api.PasswordsController, :update)
  end

  scope "/api" do
    pipe_through(:authenticated_api)

    get("/current_user", Teebox.Web.Api.UsersController, :show)
    get("/current_user/profiles", Teebox.Web.Api.ProfilesController, :index)
    post("/oauth/token/refresh", Teebox.Web.Api.TokenController, :refresh)
    delete("/oauth/token", Teebox.Web.Api.TokenController, :revoke)
  end

  scope "/", Teebox.Web do
    pipe_through(:browser)

    get("/", PageController, :index)
  end
end
