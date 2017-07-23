defmodule Teebox.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :avatar, :string
      add :password_hash, :string

      add :provider, :string
      add :uid, :string
      add :token, :string
      add :refresh_token, :string
      add :expires_at, :bigint

      timestamps()
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:provider, :uid])
    create index(:users, [:expires_at])
    create index(:users, [:provider, :token])
  end
end
