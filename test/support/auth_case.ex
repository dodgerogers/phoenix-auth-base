defmodule TeeboxWeb.AuthCase do
  use Phoenix.ConnTest

  import Teebox.Factory

  @user_repo Application.get_env(:teebox, :user_repo)

  def build_user_with_password(%{} = attrs \\ %{}) do
    build(:user, attrs) |> set_password()
  end

  def insert_user_with_password(%{} = attrs \\ %{}) do
    insert(:user, set_password(attrs))
  end

  def set_password(%{} = attrs \\ %{}) do
    password = Map.get(attrs, :password, Faker.Lorem.words(8..20))
    Map.merge(attrs, %{password_hash: Comeonin.Pbkdf2.hashpwsalt(password)})
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
    expired_datetime = Timex.shift(Timex.now, minutes: -11)
    token = Map.get(attrs, :confirmation_token, to_string(Faker.Lorem.characters(30)))
    expired_attrs = %{confirmed_at: nil, confirmation_sent_at: expired_datetime, confirmation_token: token}

    insert_user_with_password(Map.merge(attrs, expired_attrs))
  end

  defp set_confirmation_token(%{} = attrs) do
    Map.get(attrs, :confirmation_token, to_string(Faker.Lorem.characters(30)))
  end
end
