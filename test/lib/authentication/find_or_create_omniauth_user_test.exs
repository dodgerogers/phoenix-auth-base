defmodule Authentication.FindOrCreateOmniauthUserTest do
  use Teebox.ModelCase

  import Ecto.Query

  alias Teebox.Repo
  alias Teebox.User

  @name "Bobby Hartman"
  @email "b.hart@email.com"
  @provider :identity
  @uid Ecto.UUID.generate()
  @token Ecto.UUID.generate()
  @password Ecto.UUID.generate()
  @refresh_token Ecto.UUID.generate()

  setup do
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

  defp user_count, do: Repo.one(from u in User, select: count(u.id))

  test "it creates a new user when there is neither", %{auth: auth} do
    before_users = user_count()

    {:ok, user} = Teebox.Authentication.FindOrCreateOmniauthUser.call(auth)

    after_users = user_count()

    assert after_users == (before_users + 1)
    assert user.email == @email
  end

  test "it returns an error tuple when omniauth hash is not a UeberAuth struct", %{auth: %{}} do
    {:error, reason} = Teebox.Authentication.FindOrCreateOmniauthUser.call(%{})

    assert "Invalid Omniauth hash provided", reason
  end

  test "it returns an error tuple when omniauth provider is not supported", %{auth: auth} do
    invalid_auth = Map.merge(auth, %{provider: :unsupported})

    {:error, reason} = Teebox.Authentication.FindOrCreateOmniauthUser.call(invalid_auth)

    assert "Unsupported provider #{invalid_auth.provider}" == reason
  end

  test "it returns the existing user when they exist with given credentials", %{auth: auth} do
    {:ok, existing_user} = User.changeset(%User{}, %{
      email: @email,
      name: @name,
      provider: to_string(@provider),
      uid: @uid,
      token: @token,
      refresh_token: @refresh_token,
      expires_at: Guardian.Utils.timestamp + 500
    }) |> Repo.insert

    before_users = user_count()

    {:ok, user} = Teebox.Authentication.FindOrCreateOmniauthUser.call(auth)

    assert existing_user.id == user.id
    assert user_count() == before_users
  end
  #
  # test "it returns an existing user when the user has the same email", %{auth: auth} do
  #   {:ok, user} = User.registration_changeset(%User{}, %{email: @email, name: @name}) |> Repo.insert
  #   before_users = user_count()
  #   before_authorizations = authorization_count()
  #   {:ok, user_from_auth} = UserFromAuth.get_or_insert(auth, nil, Repo)
  #   assert user_from_auth.id == user.id
  #
  #   assert user_count == before_users
  #   assert authorization_count == before_authorizations + 1
  # end
  #
  # test "it deletes the authorization and makes a new one when the old one is expired", %{auth: auth} do
  #   {:ok, user} = User.registration_changeset(%User{}, %{email: @email, name: @name}) |> Repo.insert
  #   {:ok, authorization} = Authorization.changeset(
  #     Ecto.build_assoc(user, :authorizations),
  #     %{
  #       provider: to_string(@provider),
  #       uid: @uid,
  #       token: @token,
  #       refresh_token: @refresh_token,
  #       expires_at: Guardian.Utils.timestamp - 500
  #     }
  #   ) |> Repo.insert
  #
  #   before_users = user_count()
  #   before_authorizations = authorization_count()
  #   {:ok, user_from_auth} = UserFromAuth.get_or_insert(auth, nil, Repo)
  #
  #   assert user_from_auth.id == user.id
  #   assert before_users == user_count()
  #   assert authorization_count == before_authorizations
  #   auth2 = Repo.one(Ecto.assoc(user, :authorizations))
  #   refute auth2.id == authorization.id
  # end
  #
  # test "it returns an error if the user is not the current user", %{auth: auth} do
  #   {:ok, current_user} = User.registration_changeset(%User{}, %{email: "fred@example.com", name: @name}) |> Repo.insert
  #   {:ok, user} = User.registration_changeset(%User{}, %{email: @email, name: @name}) |> Repo.insert
  #   {:ok, _authorization} = Authorization.changeset(
  #     Ecto.build_assoc(user, :authorizations),
  #     %{
  #       provider: to_string(@provider),
  #       uid: @uid,
  #       token: @token,
  #       refresh_token: @refresh_token,
  #       expires_at: Guardian.Utils.timestamp + 500
  #     }
  #   ) |> Repo.insert
  #
  #   {:error, :user_does_not_match} = UserFromAuth.get_or_insert(auth, current_user, Repo)
  # end
end
