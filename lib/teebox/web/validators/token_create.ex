defmodule Teebox.Web.Validators.TokenCreate do
  use Teebox.Web, :model

  schema "token_create" do
    field :grant_type, :string
    field :email, :string
    field :password, :string
  end

  @required_fields ~w(grant_type email password)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.TokenCreate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_inclusion(:grant_type, ["password"])
  end
end
