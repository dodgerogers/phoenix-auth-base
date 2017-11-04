defmodule Teebox.Persistance.TokenRepository do
  require Logger
  import Ecto.Query

  @token_model Teebox.Accounts.Token
  @token_repo  Teebox.Repo

  def get_user_data(repo, user, creds, id_key) do
    @token_model
    |> where([s], s.token == ^creds)
    |> @token_repo.one
    |> case do
      nil -> nil
      token ->
        user_id = get_id user, id_key, token.user_id

        token.user_type
        |> String.to_atom
        |> where([u], field(u, ^id_key) == ^user_id)
        |> repo.one
    end
  end

  def put_credentials(_repo, user, creds, id_key) do
    id_str = "#{Map.get user, id_key}"
    params = %{
      token: creds,
      user_type: Atom.to_string(user.__struct__),
      user_id: id_str
    }

    # TODO: Why do we delete all other credentials for this user?
    where(@token_model, [s], s.user_id == ^id_str)
    |> @token_repo.delete_all

    @token_model.changeset(@token_model.__struct__, params)
    |> @token_repo.insert
    |> case do
      {:ok, _} -> :ok
      {:error, changeset} -> {:error, changeset}
    end
  end

  def delete_credentials(_user, creds) do
    @token_model
    |> where([s], s.token == ^creds)
    |> @token_repo.one
    |> case do
      nil ->
        nil
      user ->
        @token_repo.delete user
    end
  end

  # handle converting the users id into correct model type
  defp get_id(user, id_key, user_id) do
    case user.__struct__.__schema__(:type, id_key) do
      int when int in [:integer, :id] ->
        String.to_integer user_id
      :string ->
        user_id
    end
  end
end
