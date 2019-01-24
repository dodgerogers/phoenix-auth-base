defmodule Teebox.Accounts.RegistrationMock do
  import Teebox.Factory
  alias Teebox.Accounts.Schemas.User

  def call(%{} = _params) do
    user = build(:user, id: 1) |> with_profile()
    {:ok, user}
  end

  def call(_params) do
    invalid_changeset = Teebox.Accounts.Schemas.User.changeset(:registration, %User{}, %{})
    {:error, invalid_changeset}
  end
end
