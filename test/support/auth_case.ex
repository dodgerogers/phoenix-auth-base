defmodule TeeboxWeb.AuthCase do
  use Phoenix.ConnTest

  alias Teebox.Accounts.User

  import Teebox.Factory
  @user_repo Application.get_env(:teebox, :user_repo)

  # TODO: All of these should accept %attrs{}
  def build_user_with_password(attrs \\ %{}) do
    build(:user, attrs) |> set_password()
  end

  def set_password(user) do
    password = user.password || Faker.Lorem.words(8..20)
    %{user | password_hash: Comeonin.Pbkdf2.hashpwsalt(password)}
  end

  def create_unconfirmed_user(email, token \\ "token") do
    unconfirmed_user = build(:user, email: email, confirmed_at: nil, confirmation_token: token, confirmation_sent_at: DateTime.utc_now())

    User.changeset(:registration, unconfirmed_user, %{})
    |> @user_repo.create()
  end

  def create_confirmed_user(email) do
    already_confirmed_user = build(:user, email: email)

    User.changeset(:registration, already_confirmed_user, %{})
    |> @user_repo.create()
  end

  def create_unconfirmed_user_with_expired_token(email, token \\ "token") do
    expired_datetime = Timex.shift(Timex.now, minutes: -11)
    attrs = %{email: email, confirmation_sent_at: expired_datetime, confirmed_at: nil, confirmation_token: token}

    build(:user, attrs)
    |> Ecto.Changeset.cast(attrs, Map.keys(attrs))
    |> @user_repo.create()
  end
end
