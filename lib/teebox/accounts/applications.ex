defmodule Teebox.Accounts.Applications do
  alias Teebox.Persistance.OauthApplicationUserRepository
  alias Teebox.Accounts.OauthApplicationUser
  alias Teebox.Persistance.OauthApplicationRepository
  alias ExOauth2Provider.OauthApplications.OauthApplication

  @application_user "teebox"
  @application_name "teebox-ui"

  defp find_or_create_application_user(%{name: name} = attrs) do
    with %OauthApplicationUser{} = user <- OauthApplicationUserRepository.find_by_name(name) do
      {:ok, user}
    else
      _ -> OauthApplicationUserRepository.create(attrs)
    end
  end

  defp find_or_create_application(%OauthApplicationUser{} = app_user, %{name: name} = params) do
    with [_|_] = _ <- OauthApplicationRepository.find_by_owner_and_name(app_user.id, name) do
      {:ok}
    else
      [] -> OauthApplicationRepository.create(app_user, params)
    end
  end

  def find_default_application() do
    with %OauthApplication{} = app <- OauthApplicationRepository.find_by_name(@application_name) do
      {:ok, app}
    else
      nil -> {:error, "Application not found with name: " <> @application_name}
    end
  end

  def find_or_create_default_application() do
    find_or_create_application_user(@application_user)
    |> find_or_create_application(%{name: @application_name, redirect_uri: redirect_uri()})
  end
  defp find_or_create_default_application({:error, error}, _), do: {:error, error}
  defp find_or_create_default_application({:ok, app_user}, params), do: find_or_create_application(app_user, params)

  defp redirect_uri() do
    "https://" <> Application.get_env(:teebox, TeeboxWeb.Endpoint)[:url][:host]
  end
end
