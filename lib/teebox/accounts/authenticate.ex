defmodule Teebox.Accounts.Authenticate do
  alias Teebox.Accounts.{Applications, Confirmation, User}
  alias Teebox.Persistance.UsersRepository
  alias ExOauth2Provider.Token

  def call(%{} = params) do
    with {:ok, app} <- Applications.default_application(),
         {:ok, code} <- grant_access_token(app, params)
    do
      {:ok, code}
    else
      {:error, error, status} -> {:error, error, status}
      {:error, error} -> {:error, error}
    end
  end

  defp grant_access_token(app, %{} = params) do
    Map.merge(params, %{"client_id" => app.uid, "client_secret" => app.secret})
    |> Token.grant()
  end

  def validate_user_credentials(email, password) do
    with %User{} = user <- UsersRepository.find_by_email(email),
         true <- Comeonin.Pbkdf2.checkpw(password, user.password_hash),
         {:ok} <- is_confirmed?(user)
    do
      {:ok, user}
    else
      {:error, message} -> {:error, message}
      _ -> {:error, "Invalid email or password"}
    end
  end

  def is_confirmed?(user) do
    with true <- Confirmation.confirmed?(user) do
      {:ok}
    else
      _ -> {:error, "Account is not confirmed"}
    end
  end
end
