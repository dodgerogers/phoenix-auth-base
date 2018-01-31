use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :teebox, Teebox.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
db_config = [
  adapter: Ecto.Adapters.Postgres,
  username: System.get_env("DB_ENV_POSTGRES_USER"),
  password: System.get_env("DB_ENV_POSTGRES_PASSWORD"),
  hostname: System.get_env("DB_ENV_POSTGRES_HOST"),
  database: System.get_env("DB_ENV_NAME"),
  pool: Ecto.Adapters.SQL.Sandbox
]

config :teebox, Teebox.Repo, db_config

# TODO: Should there be a convention for this?
config :teebox, :confirm_and_sign_in_user, Teebox.Accounts.ConfirmAndSignInUserMock
config :teebox, :confirmation, Teebox.Accounts.ConfirmationMock
config :teebox, :registration, Teebox.Accounts.RegistrationMock
config :teebox, :authenticate, Teebox.Accounts.AuthenticateMock
config :teebox, :revoke_token, Teebox.Accounts.RevokeTokenMock
config :teebox, :forgot_password, Teebox.Accounts.ForgotPasswordMock

config :pbkdf2_elixir, :rounds, 1

# Mailer test configuration
config :teebox, Teebox.Mailer,
  adapter: Bamboo.TestAdapter
