defmodule Teebox.Accounts.Authenticate do
  alias Teebox.Accounts.Applications
  alias Teebox.Accounts.User

  @applications Application.get_env(:teebox, :applications)
  @user_repo Application.get_env(:teebox, :user_repo)
  @token Application.get_env(:teebox, :token)

  def call(%{"grant_type" => _, "username" => _, "password" => _} = params) do
    with {:ok, app} <- @applications.find_default_application(),
         %{} = token_params <- Map.merge(params, %{"client_id" => app.uid, "client_secret" => app.secret}),
         {:ok, %{code: _} = code} <- @token.grant(token_params)
    do
      {:ok, code}
    else
      {:error, error, status} -> {:error, error, status}
      {:error, error} -> {:error, error}
    end
  end

  def validate_user_credentials(email, password) do
    with %User{} = user <- @user_repo.find_by_email(email),
         true <- Comeonin.Pbkdf2.checkpw(password, user.password_hash),
         {:ok} <- is_confirmed?(user)
    do
      {:ok, user}
    else
      {:error, message} -> {:error, message}
      _ -> {:error, "Invalid credentials"}
    end
  end

  def is_confirmed?(user) do
    with true <- Teebox.Accounts.Confirmation.confirmed?(user) do
      {:ok}
    else
      _ -> {:error, "Account is not confirmed"}
    end
  end
end
