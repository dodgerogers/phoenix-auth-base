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

# %% Coherence Configuration %%   Don't remove this line
config :coherence,
  user_schema: Teebox.Accounts.User,
  schema_key: :id,
  repo: Teebox.Repo,
  module: Teebox,
  web_module: TeeboxWeb,
  router: TeeboxWeb.Router,
  messages_backend: TeeboxWeb.Coherence.Messages,
  minimum_password_length: 8,
  allow_unconfirmed_access_for: 0,
  logged_out_url: "/",
  email_from_name: "Your Name",
  email_from_email: "yourname@example.com",
  opts: [
    :confirmable,
    :authenticatable,
    :recoverable,
    :lockable,
    :unlockable_with_token,
    registerable: [:create, :update]]

config :coherence, TeeboxWeb.Coherence.Mailer,
  adapter: Swoosh.Adapters.Local,
  api_key: "your api key here"
  # %% End Coherence Configuration %%

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
