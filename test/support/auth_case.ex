defmodule Teebox.Web.AuthCase do
  use Phoenix.ConnTest

  import Teebox.Factory

  alias Teebox.Accounts.Services.{Applications, Password}

  @confirmation_token_expiry Application.get_env(:teebox, :confirmation_token_expiry)
  @reset_password_token_expiry Application.get_env(:teebox, :reset_password_token_expiry)

  def build_user_with_password(%{} = attrs \\ %{}) do
    build(:user, attrs) |> set_password()
  end

  def insert_user_with_password(%{} = attrs \\ %{}) do
    insert(:user, set_password(attrs))
  end

  def reload_user(user) do
    Teebox.Repo.get(Teebox.Accounts.Schemas.User, user.id)
  end

  def set_password(%{} = attrs \\ %{}) do
    password = Map.get(attrs, :password, to_string(Faker.Lorem.words(8..20)))
    Map.merge(attrs, %{password_hash: Password.hashpwsalt(password)})
  end

  def create_unconfirmed_user(%{} = attrs \\ %{}) do
    token = set_confirmation_token(attrs)
    unconfirmed_attrs = %{confirmed_at: nil, confirmation_sent_at: NaiveDateTime.utc_now(), confirmation_token: token}
    insert_user_with_password(Map.merge(attrs, unconfirmed_attrs))
  end

  def create_confirmed_user(%{} = attrs \\ {}) do
    insert_user_with_password(attrs)
  end

  def create_unconfirmed_user_with_expired_token(%{} = attrs \\ {}) do
    minutes_offset = round(@confirmation_token_expiry / 60) * -1 - 1
    expired_datetime = Timex.shift(Timex.now, minutes: minutes_offset)
    token = Map.get(attrs, :confirmation_token, to_string(Faker.Lorem.characters(30)))
    expired_attrs = %{confirmed_at: nil, confirmation_sent_at: expired_datetime, confirmation_token: token}

    insert_user_with_password(Map.merge(attrs, expired_attrs))
  end

  def create_user_with_valid_reset(%{} = attrs \\ {}) do
    token = Map.get(attrs, :reset_password_token, to_string(Faker.Lorem.characters(30)))
    expired_attrs = %{reset_password_sent_at: Timex.now, reset_password_token: token}

    insert_user_with_password(Map.merge(attrs, expired_attrs))
  end

  def create_user_with_expired_reset_token(%{} = attrs \\ {}) do
    minutes_offset = round(@reset_password_token_expiry / 60) * -1 - 1
    expired_datetime = Timex.shift(Timex.now, minutes: minutes_offset)
    token = Map.get(attrs, :reset_password_token, to_string(Faker.Lorem.characters(30)))
    expired_attrs = %{reset_password_sent_at: expired_datetime, reset_password_token: token}

    insert_user_with_password(Map.merge(attrs, expired_attrs))
  end

  defp set_confirmation_token(%{} = attrs) do
    Map.get(attrs, :confirmation_token, to_string(Faker.Lorem.characters(30)))
  end

  def create_oauth_application_user() do
    insert(:oauth_application_user, %{name: Applications.default_application_user_name()})
  end

  def create_default_oauth_application() do
    user = create_oauth_application_user()
    insert(:oauth_application, %{owner: user, name: Applications.default_application_name()})
  end
end
