defmodule Teebox.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Teebox.Accounts.User

  schema "users" do
    field :name, :string, null: false
    field :email, :string, null: false
    field :avatar, :string
    field :password, :string, virtual: true
    field :password_hash, :string
    field :uid, :string
    field :provider, :string, default: to_string(:identity)
    field :confirmed_at, :utc_datetime
    field :reset_sent_at, :utc_datetime

    timestamps()
  end

  @optional_fields ~w(avatar uid provider confirmed_at)a
  @required_fields ~w(name email)a

  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> unique_email
  end

  def create_changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, @required_fields ++ @optional_fields ++ [:password])
    |> validate_password(:password)
    |> put_password_hash
    |> validate_required(@required_fields)
    |> unique_email
  end

  defp validate_password(changeset, field, options \\ []) do
    validate_change(changeset, field, fn _, password ->
      with {:ok, _} <- NotQwerty123.PasswordStrength.strong_password?(password) do
        []
      else
        {:error, msg} -> [{field, options[:message] || msg}]
      end
    end)
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset) do
    change(changeset, Comeonin.Pbkdf2.add_hash(password))
  end
  defp put_password_hash(changeset), do: changeset

  defp unique_email(changeset) do
    validate_format(changeset, :email, ~r/@/)
    |> validate_length(:email, max: 254)
    |> unique_constraint(:email)
  end
end
