defmodule Teebox.Web.Validators.RegistrationCreate do
  use Teebox.Web, :model

  schema "registration_create" do
    field :name, :string
    field :email, :string
    field :password, :string
    field :password_confirmation, :string
  end

  @required_fields ~w(name email password password_confirmation)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.RegistrationCreate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:name, max: 254)
    |> validate_length(:email, max: 254)
    |> validate_length(:password, max: 254)
    |> validate_length(:password_confirmation, max: 254)
  end
end
