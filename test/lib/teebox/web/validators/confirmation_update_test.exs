defmodule Teebox.Web.Validators.ConfirmationUpdateTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.ConfirmationUpdate

  @valid_attrs %{
    email: "valid@email.com",
    password: "password",
    confirmation_token: Faker.String.base64()
  }

  test "returns valid changeset" do
    changeset = ConfirmationUpdate.call(@valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.email
    assert changes.password
    assert changes.confirmation_token
  end

  @invalid_attrs %{
    email: nil,
    password: to_string(Faker.Lorem.characters(255)),
    confirmation_token: ""
  }

  test "returns changeset with errors" do
    changeset = ConfirmationUpdate.call(@invalid_attrs)

    refute changeset.valid?
    assert changeset.errors == [
      password: {
        "should be at most %{count} character(s)",
        [count: 254, validation: :length, max: 254]
      },
      email: {
        "can't be blank",
        [validation: :required]
      },
      confirmation_token: {
        "can't be blank",
        [validation: :required]
      },
    ]
  end
end
