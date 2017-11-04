defmodule Teebox.Repo.Migrations.CreateTokens do
  use Ecto.Migration

  def up do
    create table(:tokens) do
      add :name, :string, unique: true
      add :user_type, :string
      add :user_id, :string

      timestamps()
    end

    create unique_index(:tokens, [:name])
    create index(:tokens, [:user_id])
  end

  def down do
    drop table(:tokens)
  end
end
