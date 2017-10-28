defmodule Teebox.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create_if_not_exists table(:users) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :avatar, :string
      add :password_hash, :string
      add :provider, :string
      add :uid, :string
      add :confirmed_at, :utc_datetime
      add :reset_sent_at, :utc_datetime

      timestamps()
    end

    create_if_not_exists unique_index(:users, [:email])
    create_if_not_exists unique_index(:users, [:provider, :uid])
  end
end
