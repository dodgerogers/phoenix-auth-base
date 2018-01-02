defmodule Teebox.Accounts.ConfirmAndSignInUser do
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
    with {:ok, access_code} <- Authenticate.call(auth_params(params)) do
      {:ok, access_code}
    else
      {:error, message, _} -> {:error, message}
      {:error, message} -> {:error, message}
    end
  end

  defp auth_params(%{} = params) do
    %{"grant_type" => "password", "username"=> params["email"], "password" => params["password"]}
  end

  defp format_result(result) do
    with {:ok, %{grant_access_token: token}} <- result do
      {:ok, token}
    else
      {:error, _process_name, message, _results} -> {:error, message}
      _ -> {:error, "Something went wrong"}
    end
  end
end
