defmodule Teebox.Accounts.RevokeToken do
  alias Teebox.Accounts.Services.Applications

  def call(%{"token" => _} = params) do
    with {:ok, app} <- Applications.default_application(),
         %{} = args <- Map.merge(params, %{"client_id" => app.uid, "client_secret" => app.secret}),
         {:ok, result} <- ExOauth2Provider.Token.revoke(args)
    do
      {:ok, result}
    else
      {:error, msg} -> {:err, msg}
      {:error, msg, _} -> {:err, msg}
    end
  end
  def call(_), do: {:error, "Invalid arguments"}
end
