defmodule Teebox.Persistance.UsersRepository do
  alias Teebox.Repo
  alias Teebox.Accounts.User
  alias Ecto.Changeset

  def find_by_id(id) do
    Repo.get_by(User, id: id)
  end

  def find_by_provider_and_uid(provider, uid) do
    Repo.get_by(User, provider: to_string(provider), uid: uid)
  end

  def insert_or_update(%Changeset{} = changeset) do
    changeset |> Repo.insert_or_update()
  end
end
