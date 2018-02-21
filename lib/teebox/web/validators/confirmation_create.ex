defmodule Teebox.Web.Validators.ConfirmationCreate do
  use Teebox.Web, :model

  schema "confirmation_create" do
    field :email, :string
  end

  @required_fields ~w(email)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.ConfirmationCreate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_length(:email, max: 254)
  end
end
