defmodule Teebox.Repo.Migrations.CreateProfilesTable do
  use Ecto.Migration

  def change do
    create table(:profiles) do
      add(:name, :string, null: false)
      add(:avatar, :string)
      add(:user_id, references(:users))

      timestamps()
    end

    create(index(:profiles, [:user_id]))
    create(unique_index(:profiles, [:name]))
  end
end
