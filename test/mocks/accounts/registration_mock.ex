defmodule Teebox.Accounts.RegistrationMock do
  import Teebox.Factory
  alias Teebox.Accounts.User

  def call(%{} = _params) do
    user = build(:user)
    {:ok, user}
  end
  def call(_params) do
    invalid_changeset = Teebox.Accounts.User.changeset(:registration, %User{}, %{})
    {:error, invalid_changeset}
  end
end
