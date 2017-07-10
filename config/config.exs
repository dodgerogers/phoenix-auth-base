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
  secret_key_base: "tdBlSUk3KNY68in1w2uRCg8/zhYPfnfAlzS+DZu5YQKn12o1lFehHhL8vJZdklWc",
  render_errors: [view: Teebox.Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Teebox.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :mix_docker, image: "377092858912.dkr.ecr.us-east-1.amazonaws.com/teebox.io"

config :ueberauth, Ueberauth,
  providers: [
    facebook: {Ueberauth.Strategy.Facebook, [default_scope: "email,public_profile", profile_fields: "name,email"]}
  ]

config :ueberauth, Ueberauth.Strategy.Facebook.OAuth,
  client_id: System.get_env("FACEBOOK_CLIENT_ID"),
  client_secret: System.get_env("FACEBOOK_CLIENT_SECRET")

  config :guardian, Guardian,
    allowed_algos: ["HS512"], # optional
    verify_module: Guardian.JWT,  # optional
    issuer: "teebox",
    ttl: { 30, :days },
    allowed_drift: 2000,
    verify_issuer: true, # optional
    secret_key: "lHYk5/k7ur9asn4DXe3Zulu81LGiN3d7eTYE+TfO5xLVaN2hU/G8M43oifjQfljJ", # Secrets
    serializer: MyApp.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
