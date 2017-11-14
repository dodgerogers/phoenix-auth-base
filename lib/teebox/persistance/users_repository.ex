defmodule Teebox.Persistance.UsersRepository do
  alias Teebox.Repo
  alias Teebox.Accounts.User
  alias Ecto.Changeset

  def find_by_id(id) do
    Repo.get_by(User, id: id)
  end

  def create(%Changeset{} = changeset) do
    Repo.insert(changeset)
  end
end
