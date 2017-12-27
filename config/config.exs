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
config :teebox, TeeboxWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: System.get_env("SECRET_KEY_BASE"),
  render_errors: [
    view: TeeboxWeb.ErrorView,
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

config :teebox, :user_repo, Teebox.Persistance.UsersRepository
config :teebox, :confirmation, Teebox.Accounts.Confirmation
config :teebox, :registration, Teebox.Accounts.Registration
config :teebox, :authenticate, Teebox.Accounts.Authenticate
config :teebox, :revoke_token, Teebox.Accounts.RevokeToken

config :teebox, Teebox.Mailer,
  adapter: Bamboo.LocalAdapter

config :ex_oauth2_provider, ExOauth2Provider,
  repo: Teebox.Repo,
  resource_owner: Teebox.Accounts.User,
  application_owner: Teebox.Accounts.OauthApplicationUser,
  use_refresh_token: false,
  grant_flows: ~w(password),
  access_token_expires_in: 900,
  password_auth: {Teebox.Accounts.Authenticate, :validate_user_credentials}

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
