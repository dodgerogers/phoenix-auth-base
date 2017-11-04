defmodule Teebox.Accounts.Token do
  use TeeboxWeb, :model

  schema "tokens" do
    field :value, :string
    field :user_type, :string
    field :user_id, :string

    timestamps()
  end

  @fields ~w(value user_type user_id)a

  def changeset(model, params \\ %{}) do
    model
    |> cast(params, @fields)
    |> validate_required(@fields)
    |> unique_constraint(:value)
  end
end
