defmodule Teebox.Web.Validators.PasswordUpdateTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.PasswordUpdate

  test "returns valid changeset" do
    valid_attrs = %{
      email: "valid@email.com",
      password: "password",
      password_confirmation: "password",
      reset_password_token: "token"
    }

    changeset = PasswordUpdate.call(valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
    assert changes.password
    assert changes.password_confirmation
    assert changes.reset_password_token
  end

  test "returns changeset with errors when missing required fields" do
    invalid_attrs = %{
      email: "",
      password: "",
      password_confirmation: "",
      reset_password_token: ""
    }

    changeset = PasswordUpdate.call(invalid_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      email: {"can't be blank", [validation: :required]},
      reset_password_token: {"can't be blank", [validation: :required]},
      password: {"can't be blank", [validation: :required]},
      password_confirmation: {"can't be blank", [validation: :required]}
    ]
  end
end
