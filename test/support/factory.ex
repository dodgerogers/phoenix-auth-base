defmodule Teebox.Factory do
  use ExMachina.Ecto, repo: Teebox.Repo

  def user_factory do
    %Teebox.Accounts.User{
      name: Faker.Name.name,
      email: Faker.Internet.email,
      avatar: "http://#{Faker.Lorem.characters(8..20)}.png",
      active: true,
      confirmed_at: DateTime.utc_now(),
      confirmation_token: nil,
      confirmation_sent_at: nil,
      failed_attempts: 0,
      locked_at: nil,
      unlock_token: nil,
      reset_password_token: nil,
      reset_password_sent_at: nil,
      password_hash: Faker.Lorem.characters(80)
    }
  end
end
