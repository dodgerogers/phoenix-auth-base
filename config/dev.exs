use Mix.Config

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :teebox, Teebox.Web.Endpoint,
  http: [port: {:system, "PORT"}],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [npm: ["run", "watch", cd: Path.expand("../assets", __DIR__)]],
  live_reload: [
    patterns: [
      ~r{priv/static/*/.*(js|css|png|jpeg|jpg|gif|svg|html)$},
      ~r{priv/gettext/.*(po)$},
      ~r{lib/teebox/*/.*(eex|ex)$},
      ~r{lib/teebox_web/*/.*(eex|ex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

db_config = [
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_ENV_POSTGRES_USER"),
  password: System.get_env("DB_ENV_POSTGRES_PASSWORD"),
  hostname: System.get_env("DB_ENV_POSTGRES_HOST"),
  database: System.get_env("DB_ENV_NAME"),
  pool_size: 10
]

config :teebox, Teebox.Repo, db_config

config :ex_oauth2_provider,
  access_token_expires_in: 60

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20
