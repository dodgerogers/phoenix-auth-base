defmodule Teebox.Web.Validators.ConfirmationUpdate do
  use Teebox.Web, :model

  schema "confirmation_update" do
    field :email, :string
    field :password, :string
    field :confirmation_token, :string
  end

  @required_fields ~w(email password confirmation_token)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.ConfirmationUpdate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
