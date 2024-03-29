defmodule Teebox.Accounts.ConfirmAndAuthenticate do
  alias Teebox.Accounts.Confirmation
  alias Teebox.Accounts.Authenticate

  def call(%{"email" => _, "password" => _, "confirmation_token" => _} = params) do
    Ecto.Multi.new()
    |> Ecto.Multi.run(:confirm_user, fn %{} -> confirm_user(params) end)
    |> Ecto.Multi.run(:grant_access_token, fn %{} -> grant_access_token(params) end)
    |> Teebox.Repo.transaction()
    |> format_result()
  end

  def call(_), do: {:error, "Invalid arguments"}

  defp confirm_user(%{"email" => _, "confirmation_token" => _} = params) do
    with {:ok, _} <- Confirmation.confirm!(params) do
      {:ok, nil}
    else
      {:error, message} -> {:error, message}
    end
  end

  defp grant_access_token(%{"email" => _, "password" => _} = params) do
    with {:ok, access_token} <- Authenticate.call(auth_params(params)) do
      {:ok, access_token}
    else
      {:error, message, _} -> {:error, message}
      {:error, message} -> {:error, message}
    end
  end

  defp auth_params(%{} = params) do
    Map.merge(params, %{"grant_type" => "password"})
  end

  defp format_result(result) do
    with {:ok, %{grant_access_token: access_token}} <- result do
      {:ok, access_token}
    else
      {:error, _process_name, message, _results} -> {:error, message}
      _ -> {:error, "Something went wrong"}
    end
  end
end
