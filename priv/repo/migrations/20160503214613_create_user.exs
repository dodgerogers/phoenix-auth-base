defmodule Authable.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string, null: false
      add :avatar, :string
      add :email, :string
      add :password, :string
      add :settings, :jsonb
      add :priv_settings, :jsonb
      add :uid, :string
      add :provider, :string

      timestamps()
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:provider, :uid])
  end
end
