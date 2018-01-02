defmodule Teebox.Accounts.Services.Applications do
  alias Teebox.Accounts.Repositories.{OauthApplicationUserRepository, OauthApplicationRepository}
  alias Teebox.Accounts.Schemas.OauthApplicationUser
  alias ExOauth2Provider.OauthApplications.OauthApplication

  @application_user "teebox"
  @application_name "teebox-ui"
  def default_application_user_name(), do: @application_user
  def default_application_name(), do: @application_name

  def default_application() do
    find_or_create_application_user(%{name: @application_user})
    |> find_or_create_application(%{name: @application_name, redirect_uri: default_redirect_uri()})
  end

  defp find_or_create_application_user(%{name: name} = attrs) do
    with %OauthApplicationUser{} = user <- OauthApplicationUserRepository.find_by_name(name) do
      {:ok, user}
    else
      _ ->
        OauthApplicationUser.changeset(%OauthApplicationUser{}, attrs)
        |> OauthApplicationUserRepository.create()
    end
  end

  defp find_or_create_application({:ok, %OauthApplicationUser{} = app_user}, %{name: name} = attrs) do
    with %OauthApplication{} = app <- OauthApplicationRepository.find_by_owner_and_name(app_user.id, name) do
      {:ok, app}
    else
      _ -> OauthApplicationRepository.create(app_user, attrs)
    end
  end

  defp default_redirect_uri() do
    "https://" <> Application.get_env(:teebox, Teebox.Web.Endpoint)[:url][:host]
  end
end
