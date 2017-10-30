defmodule Teebox.Factory do
  use ExMachina.Ecto, repo: Teebox.Repo

  def user_factory do
    %Teebox.Accounts.User{
      email: Faker.Internet.email,
      avatar: "http://#{Faker.Lorem.characters(8..20)}.png",
      name: Faker.Name.name,
      provider: to_string(:identity),
      uid: Ecto.UUID.generate(),
      confirmed_at: DateTime.utc_now(),
      reset_sent_at: nil,
      password_hash: Comeonin.Pbkdf2.hashpwsalt(Faker.Lorem.characters(8..20))
    }
  end
end
