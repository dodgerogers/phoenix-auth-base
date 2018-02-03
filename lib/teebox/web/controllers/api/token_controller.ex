defmodule Teebox.Web.Api.TokenController do
  use Teebox.Web, :controller

  @authenticate Application.get_env(:teebox, :authenticate)
  @revoke_token Application.get_env(:teebox, :revoke_token)

  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken

  def create(conn, params) do
    with {:ok, access_token} <- @authenticate.call(params) do
      conn
      |> render("token.json", %{access_token: access_token})
    else
      {:error, error, status} -> render_error(conn, error, status)
      {:error, error} -> render_error(conn, error, 400)
    end
  end

  def revoke(conn, _) do
    with %OauthAccessToken{token: token} = _ <- ExOauth2Provider.Plug.current_access_token(conn),
         {:ok, _} <- @revoke_token.call(%{"token" => token})
    do
      conn
      |> render_empty_body(204)
    else
      {:error, error} -> render_error(conn, error, 400)
    end
  end
end
