defmodule Authentication.FindOrCreateOmniauthUserTest do
  use Teebox.ModelCase

  import Teebox.Factory

  @name "Bobby Hartman"
  @email "b.hart@email.com"
  @password Ecto.UUID.generate()
  @provider :identity
  @uid Ecto.UUID.generate()
  @token Ecto.UUID.generate()
  @refresh_token Ecto.UUID.generate()

  setup do
    Teebox.Persistance.Users.Mock.clear()

    auth = %Ueberauth.Auth{
      uid: @uid,
      provider: @provider,
      info: %Ueberauth.Auth.Info{
        name: @name,
        email: @email,
      },
      credentials: %Ueberauth.Auth.Credentials{
        token: @token,
        refresh_token: @refresh_token,
        expires_at: Guardian.Utils.timestamp + 1000,
        other: %{
          password: @password,
          password_confirmation: @password
        }
      }
    }

    {:ok, %{auth: auth}}
  end

  defp user_count, do: length(Teebox.Persistance.Users.Mock.all())

  test "#call creates a new user when one does not exist with given credentials", %{auth: auth} do
    before_users = user_count()

    {:ok, user} = Teebox.Authentication.FindOrCreateOmniauthUser.call(auth)

    assert user_count() == (before_users + 1)

    validate_user(user)
  end

  test "#call returns the existing user when they exist with given credentials", %{auth: auth} do
    user_with_same_uid_and_email = build(:user, %{
      id: 1,
      uid: @uid,
      email: @email,
      provider: to_string(@provider),
    })

    Teebox.Persistance.Users.Mock.create(user_with_same_uid_and_email)

    before_users = user_count()

    {:ok, user} = Teebox.Authentication.FindOrCreateOmniauthUser.call(auth)

    assert user_count() == before_users
    assert user_with_same_uid_and_email.id == user.id
    validate_user(user)
  end

  test "#call returns an error tuple when omniauth hash is not a UeberAuth struct", %{auth: %{}} do
    {:error, reason} = Teebox.Authentication.FindOrCreateOmniauthUser.call(%{})

    assert "Invalid Omniauth hash provided", reason
  end

  test "#call returns an error tuple when omniauth provider is not supported", %{auth: auth} do
    invalid_auth = Map.merge(auth, %{provider: :unsupported})

    {:error, reason} = Teebox.Authentication.FindOrCreateOmniauthUser.call(invalid_auth)

    assert "Unsupported provider #{invalid_auth.provider}" == reason
  end

  defp validate_user(user) do
    assert user.uid == @uid
    assert user.name == @name
    assert user.email == @email
    assert user.refresh_token == @refresh_token
    assert is_binary(user.token)
    assert Comeonin.Pbkdf2.checkpw(@password, user.password_hash)
  end
end
