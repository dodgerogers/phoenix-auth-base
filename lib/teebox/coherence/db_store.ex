defimpl Coherence.DbStore, for: Teebox.Accounts.User do
  alias Teebox.Repo
  alias Teebox.Persistance.TokenRepository

  def get_user_data(user, creds, id_key),
    do: TokenRepository.get_user_data(Repo, user, creds, id_key)

  def put_credentials(user, creds, id_key),
    do: TokenRepository.put_credentials(Repo, user, creds, id_key)

  def delete_credentials(user, creds),
    do: TokenRepository.delete_credentials(user, creds)

  def delete_user_logins(_), do: nil  
end
