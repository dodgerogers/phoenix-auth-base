defmodule Teebox.Accounts.RefreshToken do
  alias Teebox.Accounts.Services.Applications
  alias ExOauth2Provider.Token
  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  def call(%OauthAccessToken{} = token) do
    with {:ok, app} <- Applications.default_application(),
         {:ok, access_token} <- refresh_access_token(app, token)
    do
      {:ok, access_token}
    else
      {:error, error, _status} -> {:error, error}
      _ -> {:error, "Something went wrong"}
    end
  end
  def call(_), do: {:error, "Invalid arguments"}

  defp refresh_access_token(app, token) do
    %{
      "grant_type" => "refresh_token",
      "client_id" => app.uid,
      "client_secret" => app.secret,
      "refresh_token" => token.refresh_token
    } |> Token.grant()
  end
end
