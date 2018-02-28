defmodule Teebox.Web.Validators.PasswordCreateTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.PasswordCreate

  test "returns valid changeset" do
    changeset = PasswordCreate.call(%{email: "valid@email.com"})

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
  end

  test "returns changeset with errors when email not present" do
    changeset = PasswordCreate.call(%{email: nil})

    refute changeset.valid?
    assert changeset.errors == [
      email: {
        "can't be blank",
        [validation: :required]
      }
    ]
  end
end
