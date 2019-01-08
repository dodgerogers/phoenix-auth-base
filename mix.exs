defmodule Teebox.Mixfile do
  use Mix.Project

  def project do
    [
      app: :teebox,
      version: "0.0.3",
      elixir: "~> 1.7.4",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers(),
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application(:test), do: application(:default) ++ [:ex_machina]

  def application do
    [
      mod: {Teebox, []},
      extra_applications: [
        :bamboo,
        :comeonin,
        :cowboy,
        :faker,
        :gettext,
        :logger,
        :not_qwerty123,
        :pbkdf2_elixir,
        :phoenix,
        :phoenix_pubsub,
        :phoenix_html,
        :phoenix_ecto,
        :postgrex,
        :timex
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
      {:bamboo, "~> 0.8"},
      {:comeonin, "~> 3.2.0"},
      {:cowboy, "~> 2.0"},
      {:ex_machina, "~> 2.0", only: :test},
      {:ex_oauth2_provider, "~> 0.4.3"},
      {:faker, "~> 0.11.2"},
      {:gettext, "~> 0.13.1"},
      {:mix_docker, "~> 0.4.1"},
      {:not_qwerty123, "2.2.0"},
      {:pbkdf2_elixir, "~> 0.12"},
      {:phoenix, "~> 1.4.0", override: true},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.2.0", only: :dev},
      {:plug, "~> 1.7"},
      {:plug_cowboy, "~> 2.0"},
      {:sobelow, "~> 0.6.8"},
      {:timex, "~> 3.1"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.seed": ["run priv/repo/seeds.exs"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "ecto.seed"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.drop --quiet", "ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
