# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :teebox,
  ecto_repos: [Teebox.Repo]

# Configures the endpoint
config :teebox, Teebox.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  render_errors: [
    view: Teebox.Web.ErrorView,
    accepts: ~w(html json)
  ],
  pubsub: [
    name: Teebox.PubSub,
    adapter: Phoenix.PubSub.PG2
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

 # TODO: Secrets
config :mix_docker, image: "377092858912.dkr.ecr.us-east-1.amazonaws.com/teebox.io"

config :authable,
  ecto_repos: [Authable.Repo],
  repo: Authable.Repo,
  resource_owner: Authable.Model.User,
  token_store: Authable.Model.Token,
  client: Authable.Model.Client,
  app: Authable.Model.App,
  expires_in: %{
    access_token: 3600,
    refresh_token: 24 * 3600,
    authorization_code: 300,
  },
  grant_types: %{
    authorization_code: Authable.GrantType.AuthorizationCode,
    client_credentials: Authable.GrantType.ClientCredentials,
    password: Authable.GrantType.Password,
    refresh_token: Authable.GrantType.RefreshToken
  },
  auth_strategies: %{
    headers: %{
      "authorization" => [
        {~r/Bearer ([a-zA-Z\-_\+=]+)/, Authable.Authentication.Bearer},
      ],
      "x-api-token" => [
        {~r/([a-zA-Z\-_\+=]+)/, Authable.Authentication.Bearer}
      ]
    },
    query_params: %{
      "access_token" => Authable.Authentication.Bearer
    }
  },
  scopes: ~w(read write),
  renderer: Authable.Renderer.RestApi

config :shield, Shield.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  render_errors: [
    accepts: ~w(json),
    format: "json"
  ]

config :shield,
  confirmable: true,
  otp_check: false,
  hooks: Shield.Hook.Default,
  views: %{
    changeset: Shield.ChangesetView,
    error: Shield.ErrorView,
    app: Shield.AppView,
    client: Shield.ClientView,
    token: Shield.TokenView,
    user: Shield.UserView
  },
  cors_origins: "http://localhost:4000, *",
  front_end: %{
    base: "http://localhost:4200",
    confirmation_path: "/users/confirm?confirmation_token={{confirmation_token}}",
    reset_password_path: "/users/reset-password?reset_token={{reset_token}}"
  },
  ecto_repos: []

config :shield_notifier,
  channels: %{
    email: %{
      from: %{
        name: {:system, "Teebox", "Teebox"},
        email: {:system, "Teebox", "no-reply@localhost"}
      }
    }
  }

config :shield_notifier, Shield.Notifier.Mailer,
  adapter: Bamboo.LocalAdapter#,
  # api_key: System.get_env("SENDGRID_API_KEY")

config :ueberauth, Ueberauth,
  providers: [
    facebook: {
      Ueberauth.Strategy.Facebook,
      [
        default_scope: "email,public_profile",
        profile_fields: "name,email"
      ]
    }
  ]

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

config :teebox, :user_repo, Teebox.Persistance.UsersRepository
config :teebox, :omni_auth_login, Teebox.Accounts.OmniAuthLogin

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
