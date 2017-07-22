defmodule Teebox.User do
  use Teebox.Web, :model

  # Don't like this
  @derive {Poison.Encoder, only: [:name, :email, :avatar, :provider]}

  schema "users" do
    field :name, :string, null: false
    field :email, :string, null: false
    field :avatar, :string

    field :provider, :string
    field :uid, :string
    field :token, :string
    field :refresh_token, :string
    field :expires_at, :integer
    field :password_hash, :string

    timestamps()
  end

  @optional_fields ~w(avatar refresh_token expires_at)a
  @required_fields ~w(name email provider uid token password_hash)a

  def changeset(struct, params \\ %{}) do
    struct
      |> cast(params, @required_fields ++ @optional_fields)
      |> validate_required(@required_fields)
      |> validate_format(:email, ~r/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
      |> unique_constraint(:email)
  end
end
