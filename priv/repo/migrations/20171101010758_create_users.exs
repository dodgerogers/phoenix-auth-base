defmodule Teebox.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    # TODO: Rename to accounts
    create table(:users) do
      add(:email, :string, null: false)

      # confirmable
      add(:confirmation_token, :string)
      add(:confirmed_at, :utc_datetime)
      add(:confirmation_sent_at, :utc_datetime)

      # authenticatable
      add(:password_hash, :string)
      add(:active, :boolean, null: false, default: true)

      # recoverable
      add(:reset_password_token, :string)
      add(:reset_password_sent_at, :utc_datetime)

      # lockable
      add(:failed_attempts, :integer, default: 0)
      add(:locked_at, :utc_datetime)

      # unlockable_with_token
      add(:unlock_token, :string)

      timestamps()
    end

    create(unique_index(:users, [:email]))
  end
end
