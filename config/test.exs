use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :teebox, Teebox.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :teebox, Teebox.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_ENV_POSTGRES_USER"),
  password: System.get_env("DB_ENV_POSTGRES_PASSWORD"),
  hostname: System.get_env("DB_ENV_POSTGRES_HOST"),
  database: System.get_env("DB_ENV_NAME"),
  pool: Ecto.Adapters.SQL.Sandbox

# Reduce number of rounds for hashing
config :pbkdf2_elixir, :log_rounds, 1

config :teebox, :user_repo, Teebox.Persistance.UsersRepositoryMock
config :teebox, :omni_auth_login, Teebox.Authentication.OmniAuthLoginMock

# Mailer test configuration
config :teebox, Teebox.Mailer,
  adapter: Bamboo.TestAdapter
