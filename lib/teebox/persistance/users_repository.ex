defmodule Teebox.Persistance.UsersRepository do
  use Teebox.Persistance.BaseRepository
  alias Teebox.Accounts.User

  def find_by_confirmation(email, confirmation_token) do
    Teebox.Repo.get_by(User, %{email: email, confirmation_token: confirmation_token})
  end

  def find_by_email(email) do
    Teebox.Repo.get_by(User, %{email: email})
  end
end
