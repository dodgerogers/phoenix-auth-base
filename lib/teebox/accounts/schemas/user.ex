# TODO: Rename this model (account etc)
defmodule Teebox.Accounts.Schemas.User do
  use Teebox.Web, :model

  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken
  alias Teebox.Accounts.Schemas.Profile
  alias Teebox.Services.StringUtil
  alias Teebox.Accounts.Services.Password

  schema "users" do
    field(:email, :string)
    field(:confirmation_token, :string)
    field(:confirmed_at, :naive_datetime)
    field(:confirmation_sent_at, :naive_datetime)
    field(:password, :string, virtual: true)
    field(:password_confirmation, :string, virtual: true)
    field(:password_hash, :string)
    field(:failed_attempts, :integer, default: 0)
    field(:locked_at, :naive_datetime)
    field(:unlock_token, :string)
    field(:active, :boolean, default: true)
    field(:reset_password_token, :string)
    field(:reset_password_sent_at, :naive_datetime)

    has_many(:profiles, Profile, foreign_key: :user_id)
    has_many(:tokens, OauthAccessToken, foreign_key: :resource_owner_id)

    timestamps()
  end

  # TODO: Move changesets into boundaries
  @required_fields ~w(email password password_confirmation)a
  def required_fields, do: @required_fields

  def changeset(:registration, user, params) do
    user
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> validate_format(:email, ~r/@/)
    |> unique_email()
    |> Password.set_password()
    |> add_confirmation()
  end

  def changeset(:confirm, user) do
    user
    |> cast(%{}, [:confirmation_token, :confirmation_sent_at, :confirmed_at])
    |> change(%{
      confirmation_token: nil,
      confirmation_sent_at: nil,
      confirmed_at: NaiveDateTime.utc_now()
    })
    |> validate_required(:confirmed_at)
  end

  def changeset(:confirmation, user) do
    user
    |> cast(%{}, [:confirmation_token, :confirmation_sent_at])
    |> add_confirmation()
  end

  def add_confirmation(changeset) do
    changeset
    |> change(%{confirmation_sent_at: NaiveDateTime.utc_now()})
    |> change(%{confirmation_token: StringUtil.random_string()})
    |> unique_constraint(:confirmation_token)
  end

  defp unique_email(changeset) do
    validate_format(changeset, :email, ~r/@/)
    |> validate_length(:email, max: 254)
    |> unique_constraint(:email)
  end
end
