defmodule TeeboxWeb.AuthCase do
  use Phoenix.ConnTest

  import Teebox.Factory

  def build_user_with_password(attrs \\ %{}) do
    build(:user, attrs) |> set_password()
  end

  def set_password(user) do
    password = user.password || Faker.Lorem.words(8..20)
    %{user | password_hash: Comeonin.Pbkdf2.hashpwsalt(password)}
  end
end
