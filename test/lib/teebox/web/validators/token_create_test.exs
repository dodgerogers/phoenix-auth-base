defmodule Teebox.Web.Validators.TokenCreateTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.TokenCreate

  @valid_attrs %{
    email: "valid@email.com",
    password: "password",
    grant_type: "password"
  }

  test "returns valid changeset" do
    changeset = TokenCreate.call(@valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
    assert changes.password
    assert changes.grant_type
  end

  @invalid_attrs %{
    email: nil,
    password: "",
    grant_type: "invalid"
  }

  test "returns changeset with errors" do
    changeset = TokenCreate.call(@invalid_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      grant_type: {
        "is invalid",
        [validation: :inclusion]
      },
      email: {
        "can't be blank",
        [validation: :required]
      },
      password: {
        "can't be blank",
        [validation: :required]
      }
    ]
  end
end
