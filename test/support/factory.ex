defmodule Teebox.Factory do
  use ExMachina.Ecto, repo: Teebox.Repo

  def user_factory do
    %Teebox.Accounts.Schemas.User{
      email: Faker.Internet.email(),
      active: true,
      confirmed_at: NaiveDateTime.utc_now(),
      confirmation_token: nil,
      confirmation_sent_at: nil,
      failed_attempts: 0,
      locked_at: nil,
      unlock_token: nil,
      reset_password_token: nil,
      reset_password_sent_at: nil,
      password_hash: Faker.String.base64()
    }
  end

  def with_profile(user) do
    build(:profile, user: user)
    user
  end

  def profile_factory do
    %Teebox.Accounts.Schemas.Profile{
      name: Faker.Name.name() <> "12345678",
      avatar: "http://#{Faker.Lorem.characters(8..20)}.png",
      user: build(:user)
    }
  end

  def oauth_application_user_factory do
    %Teebox.Accounts.Schemas.OauthApplicationUser{
      name: Faker.Name.name()
    }
  end

  def oauth_application_factory do
    %ExOauth2Provider.OauthApplications.OauthApplication{
      owner: build(:oauth_application_user),
      name: Faker.Name.name(),
      uid: Faker.String.base64(),
      secret: Faker.String.base64(),
      redirect_uri: "https://" <> Faker.Internet.domain_name()
    }
  end

  def oauth_access_token_factory do
    %ExOauth2Provider.OauthAccessTokens.OauthAccessToken{
      resource_owner: build(:user),
      application: build(:oauth_application),
      token: Faker.String.base64(),
      refresh_token: Faker.String.base64(),
      expires_in: 900,
      revoked_at: nil,
      scopes: nil,
      previous_refresh_token: nil
    }
  end
end
