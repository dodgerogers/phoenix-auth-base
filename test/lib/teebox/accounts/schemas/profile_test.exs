defmodule Teebox.Accounts.Schemas.ProfileTest do
  use Teebox.ModelCase, async: true

  import Teebox.Factory

  alias Teebox.Accounts.Schemas.Profile

  @valid_attrs %{
    name: "profile" <> Integer.to_string(Faker.random_between(100, 200)),
    avatar: "avatar.png"
  }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    user = insert(:user)
    valid_attributes = Map.put(@valid_attrs, :user_id, user.id)
    changeset = Profile.changeset(%Profile{}, valid_attributes)

    assert changeset.valid?
    changes = changeset.changes
    assert changes.name == Map.get(valid_attributes, :name)
    assert changes.avatar == Map.get(valid_attributes, :avatar)
    assert changes.user_id == Map.get(valid_attributes, :user_id)
  end

  test "changeset is invalid with missing attributes" do
    changeset = Profile.changeset(%Profile{}, @invalid_attrs)

    refute changeset.valid?
  end

  test "changset is invalid when name is too long" do
    invalid_name = to_string(Faker.Lorem.characters(255))
    invalid_attrs = Map.merge(@valid_attrs, %{name: invalid_name})
    changeset = Profile.changeset(%Profile{}, invalid_attrs)

    refute changeset.valid?

    assert changeset.errors[:name] ==
             {"should be at most %{count} character(s)",
              [count: 254, validation: :length, max: 254]}
  end

  test "changset is invalid when name is too short" do
    invalid_name = to_string(Faker.Lorem.characters(7))
    invalid_attrs = Map.merge(@valid_attrs, %{name: invalid_name})
    changeset = Profile.changeset(%Profile{}, invalid_attrs)

    refute changeset.valid?

    assert changeset.errors[:name] ==
             {"should be at least %{count} character(s)", [count: 8, validation: :length, min: 8]}
  end

  test "changeset is unable to save when name is not unique" do
    profile = insert(:profile, @valid_attrs)
    non_unique_attrs = Map.put(@valid_attrs, :user_id, profile.user.id)
    changeset = Profile.changeset(%Profile{}, non_unique_attrs)

    {:error, changeset} = Teebox.Repo.insert(changeset)

    assert changeset.errors[:name] == {"has already been taken", []}
  end
end
