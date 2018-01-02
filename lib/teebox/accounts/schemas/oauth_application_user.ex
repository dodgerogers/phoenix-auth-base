defmodule Teebox.Accounts.Schemas.OauthApplicationUser do
  use Teebox.Web, :model

  alias ExOauth2Provider.OauthApplications.OauthApplication

  schema "oauth_application_users" do
    field :name, :string

    has_one :oauth_application, OauthApplication, foreign_key: :owner_id

    timestamps()
  end

  @required_fields ~w(name)a

  def changeset(oauth_application_user, params) do
    oauth_application_user
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> unique_constraint(:name)
    |> validate_length(:name, max: 254)
  end
end
