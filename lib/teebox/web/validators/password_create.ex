defmodule Teebox.Web.Validators.PasswordCreate do
  use Teebox.Web, :model

  schema "password_create" do
    field :email, :string
  end

  @required_fields ~w(email)a
  @optional_fields ~w()a

  def call(params \\ :empty) do
    %Teebox.Web.Validators.PasswordCreate{}
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
