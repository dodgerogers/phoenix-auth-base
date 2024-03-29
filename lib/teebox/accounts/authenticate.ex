defmodule Teebox.Accounts.Authenticate do
  alias Teebox.Accounts.Confirmation
  alias Teebox.Accounts.Services.{Applications, Password}
  alias Teebox.Accounts.Schemas.User
  alias Teebox.Accounts.Repositories.UsersRepository
  alias ExOauth2Provider.Token

  @error_message "Invalid email or password"

  def call(%{"grant_type" => "password", "email" => _, "password" => _} = params) do
    with {:ok, app} <- Applications.default_application(),
         {:ok, access_token} <- grant_access_token(app, params) do
      {:ok, access_token}
    else
      {:error, _, status} -> {:error, @error_message, status}
      {:error, _} -> {:error, @error_message}
    end
  end

  def call(_), do: {:error, "Invalid arguments"}

  defp grant_access_token(app, %{} = params) do
    Map.merge(params, %{
      "client_id" => app.uid,
      "client_secret" => app.secret,
      "username" => params["email"]
    })
    |> Token.grant()
  end

  def validate_user_credentials(email, password) do
    with %User{} = user <- UsersRepository.find_by_email(email),
         true <- Password.checkpw(password, user.password_hash),
         {:ok} <- is_confirmed?(user) do
      {:ok, user}
    else
      {:error, message} -> {:error, message}
      _ -> {:error, @error_message}
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
