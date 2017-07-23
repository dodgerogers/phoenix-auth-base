defmodule Teebox.Factory do
  use ExMachina.Ecto, repo: Teebox.Repo

  def user_factory do
    %Teebox.User{
      email: Faker.Internet.email,
      name: Faker.Name.name,
      provider: to_string(:identity),
      uid: Ecto.UUID.generate(),
      token: Ecto.UUID.generate(),
      refresh_token: Ecto.UUID.generate(),
      expires_at: Guardian.Utils.timestamp + 500,
      password_hash: Comeonin.Pbkdf2.hashpwsalt(Faker.Lorem.characters(8..20))
    }
  end
end
