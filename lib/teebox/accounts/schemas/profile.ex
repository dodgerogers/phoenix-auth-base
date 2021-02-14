defmodule Teebox.Accounts.Schemas.Profile do
  use Teebox.Web, :model

  schema "profiles" do
    field(:name, :string)
    field(:avatar, :string)

    belongs_to(:user, Teebox.Accounts.Schemas.User)

    timestamps()
  end

  @required_fields ~w(name user_id)a
  def required_fields, do: @required_fields
  @optional_fields ~w(avatar)a
  def optional_fields, do: @optional_fields

  def changeset(%Teebox.Accounts.Schemas.Profile{} = profile, %{} = params \\ %{}) do
    profile
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    # |> validate_format(:name, ~r/^[0-9|a-z|A-Z]*$/)
    # |> validate_format(:name, no whitespace) // Why?
    |> unique_name()
  end

  defp unique_name(%Ecto.Changeset{} = changeset) do
    changeset
    |> validate_length(:name, max: 254, min: 8)
    |> unique_constraint(:name)
  end
end
