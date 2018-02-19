defmodule Teebox.Web.Validators.RegistrationParamsTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Web.Validators.RegistrationCreate

  @password "password"
  @valid_attrs %{
    name: "name",
    email: "valid@email.com",
    password: @password,
    password_confirmation: @password
  }

  test "returns valid changeset" do
    changeset = RegistrationCreate.call(@valid_attrs)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.name
    assert changes.email
    assert changes.password
    assert changes.password_confirmation
  end

  @invalid_attrs %{
    name: 1,
    email: nil,
    password: to_string(Faker.Lorem.characters(255)),
    password_confirmation: ""
  }

  test "returns changeset with errors" do
    changeset = RegistrationCreate.call(@invalid_attrs)

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
      password_confirmation: {
        "can't be blank",
        [validation: :required]
      },
      name: {
        "is invalid",
        [type: :string, validation: :cast]
      }
    ]
  end
end
