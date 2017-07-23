defmodule Teebox.Mixfile do
  use Mix.Project

  def project do
    [app: :teebox,
     version: "0.0.3",
     elixir: "~> 1.4",
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
        :comeonin,
        :cowboy,
        :faker,
        :gettext,
        :logger,
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
      {:comeonin, "~> 2.4"},
      {:cowboy, "~> 1.0"},
      {:ex_machina, "~> 2.0", only: :test},
      {:faker, "~> 0.8"},
      {:gettext, "~> 0.11"},
      {:guardian, "~> 0.12.0"},
      {:mix_docker, "~> 0.4.1"},
      {:mock, "~> 0.2.0", only: :test},
      {:phoenix, "~> 1.3.0-rc"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.6"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:ueberauth, "~> 0.4"},
      {:ueberauth_facebook, "~> 0.6"},
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
