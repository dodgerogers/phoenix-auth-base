defmodule Teebox.Accounts.User do
  use TeeboxWeb, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :avatar, :string

    field :confirmation_token, :string
    field :confirmed_at, Ecto.DateTime
    field :confirmation_sent_at, Ecto.DateTime

    field :password, :string, virtual: true
    field :password_confirmation, :string, virtual: true
    field :password_hash, :string

    field :failed_attempts, :integer, default: 0
    field :locked_at, Ecto.DateTime

    field :unlock_token, :string

    field :active, :boolean, default: true

    field :reset_password_token, :string
    field :reset_password_sent_at, Ecto.DateTime

    timestamps()
  end

  @required_fields ~w(name email password password_confirmation)a
  @optional_fields ~w(avatar)a

  def changeset(:registration, user, params) do
    user
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> unique_email()
    |> validate_passwords_match()
    |> validate_password_strength()
    |> put_password_hash()
    |> add_confirmation()
  end

  def changeset(:confirm, user) do
    user
    |> cast(%{}, [:confirmation_token, :confirmation_sent_at, :confirmed_at])
    |> change(%{confirmation_token: nil, confirmation_sent_at: nil, confirmed_at: Ecto.DateTime.utc})
    |> validate_required(:confirmed_at)
  end

  def add_confirmation(user) do
    user
    |> change(%{confirmation_sent_at: Ecto.DateTime.utc})
    |> change(%{confirmation_token: random_string()})
    |> unique_constraint(:confirmation_token)
  end

  def confirm(user) do
    user
    |> change(%{confirmed_at: Ecto.DateTime.utc, confirmation_sent_at: nil, confirmation_token: nil})
  end

  defp unique_email(changeset) do
     validate_format(changeset, :email, ~r/@/)
     |> validate_length(:email, max: 254)
     |> unique_constraint(:email)
   end

   defp validate_passwords_match(%Ecto.Changeset{changes: %{password: pw, password_confirmation: pw}} = changeset) do
     changeset
   end
   defp validate_passwords_match(%Ecto.Changeset{changes: %{}} = changeset) do
     add_error(changeset, :password_confirmation, "Passwords do not match")
   end

  defp validate_password_strength(changeset, options \\ []) do
     validate_change(changeset, :password, fn _, password ->
       with {:ok, _} <- NotQwerty123.PasswordStrength.strong_password?(password) do
         []
       else
         {:error, msg} -> [{:password, options[:message] || msg}]
       end
     end)
   end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: pw}} = changeset) do
    changeset |> change(%{password_hash: Comeonin.Pbkdf2.hashpwsalt(pw)})
  end
  defp put_password_hash(changeset), do: changeset

  def random_string(length \\ 30) do
    length
    |> :crypto.strong_rand_bytes
    |> Base.url_encode64
    |> binary_part(0, length)
  end
end
