defmodule Teebox.Mixfile do
  use Mix.Project

  def project do
    [app: :teebox,
     version: "0.0.3",
     elixir: "~> 1.5.2",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application(:test), do: application(:default) ++ [:ex_machina]
  def application do
    [
      mod: {Teebox, []},
      applications: [
        :bamboo,
        :comeonin,
        :cowboy,
        :faker,
        :gettext,
        :guardian,
        :logger,
        :not_qwerty123,
        :pbkdf2_elixir,
        :phoenix,
        :phoenix_pubsub,
        :phoenix_html,
        :phoenix_ecto,
        :postgrex,
        :ueberauth,
        :ueberauth_facebook,
        :ueberauth_identity,
      ]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support", "test/mocks"]
  defp elixirc_paths(_), do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:bamboo, "~> 1.0.0-rc.1"},
      {:comeonin, "~> 4.0"},
      {:cowboy, "~> 1.0"},
      {:ex_machina, "~> 2.0", only: :test},
      {:faker, "~> 0.9"},
      {:gettext, "~> 0.12"},
      {:guardian, "~> 0.14.5"},
      {:mix_docker, "~> 0.4.1"},
      {:mock, "~> 0.2.0", only: :test},
      {:not_qwerty123, "~> 2.2"},
      {:pbkdf2_elixir, "~> 0.12"},
      {:phauxth, "~> 1.2"},
      {:phoenix, "~> 1.3.0-rc", override: true}, # Guardian does not support 1.3
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:ueberauth, "~> 0.4"},
      {:ueberauth_facebook, "~> 0.7"},
      {:ueberauth_identity, "~> 0.2"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.drop --quiet", "ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
