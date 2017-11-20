defmodule Teebox.Persistance.UsersRepository do
  alias Teebox.Repo
  alias Teebox.Accounts.User
  alias Ecto.Changeset

  def create(%Changeset{} = changeset) do
    Repo.insert(changeset)
  end

  def update(%Changeset{} = changeset) do
    Repo.update(changeset)
  end

  def find_by_confirmation(email, confirmation_token) do
    Repo.get_by(User, %{email: email, confirmation_token: confirmation_token})
  end

  def find_by_email(email) do
    Repo.get_by(User, %{email: email})
  end
end
