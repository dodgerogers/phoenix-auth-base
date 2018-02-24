defmodule Teebox.Web.Api.TokenController do
  use Teebox.Web, :controller

  alias ExOauth2Provider.OauthAccessTokens.OauthAccessToken
  alias Teebox.Web.Validators.TokenCreate

  plug ValidateParams, {TokenCreate, :call} when action == :create

  @authenticate Application.get_env(:teebox, :authenticate)
  @revoke_token Application.get_env(:teebox, :revoke_token)
  @refresh_token Application.get_env(:teebox, :refresh_token)

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
      render_no_content(conn, 204)
    else
      {:error, error} -> render_error(conn, error, 400)
    end
  end

  def refresh(conn, _) do
    with %OauthAccessToken{} = token <- ExOauth2Provider.Plug.current_access_token(conn),
         {:ok, access_token} <- @refresh_token.call(token)
    do
      conn
      |> render("token.json", %{access_token: access_token})
    else
      {:error, error} -> render_error(conn, error, 400)
    end
  end
end
