defmodule Teebox.Repo.Migrations.CreateOauthApplicationUser do
  use Ecto.Migration

  def change do
    create table(:oauth_application_users) do
      add :name, :string, null: false

      timestamps()
    end

    create unique_index(:oauth_application_users, [:name])
  end
end
