defmodule Teebox.Web.Validators.ConfirmationCreateTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.ConfirmationCreate

  @valid_attrs %{
    email: "valid@email.com"
  }

  test "returns valid changeset" do
    changeset = ConfirmationCreate.call(@valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
  end

  @invalid_attrs %{
    email: nil
  }

  test "returns changeset with errors" do
    changeset = ConfirmationCreate.call(@invalid_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      email: {
        "can't be blank",
        [validation: :required]
      }
    ]
  end
end
