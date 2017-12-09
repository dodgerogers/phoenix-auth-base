defmodule Teebox.Factory do
  use ExMachina.Ecto, repo: Teebox.Repo

  def user_factory do
    %Teebox.Accounts.User{
      name: Faker.Name.name,
      email: Faker.Internet.email,
      avatar: "http://#{Faker.Lorem.characters(8..20)}.png",
      active: true,
      confirmed_at: NaiveDateTime.utc_now(),
      confirmation_token: nil,
      confirmation_sent_at: nil,
      failed_attempts: 0,
      locked_at: nil,
      unlock_token: nil,
      reset_password_token: nil,
      reset_password_sent_at: nil,
      password_hash: to_string(Faker.Lorem.characters(50))
    }
  end

  def oauth_application_user_factory do
    %Teebox.Accounts.OauthApplicationUser{
      name: Faker.Name.name
    }
  end

  def oauth_application_factory do
    %ExOauth2Provider.OauthApplications.OauthApplication{
      owner: build(:oauth_application_user),
      name: Faker.Name.name,
      uid: Faker.String.base64(),
      secret: Faker.String.base64(),
      redirect_uri: "https://" <> Faker.Internet.domain_name()
    }
  end
end
