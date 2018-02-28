defmodule Teebox.Web.Validators.PasswordUpdate do
  use Teebox.Web, :model

  schema "password_update" do
    field :email, :string
    field :reset_password_token, :string
    field :password, :string
    field :password_confirmation, :string
  end

  @required_fields ~w(email reset_password_token password password_confirmation)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.PasswordUpdate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
