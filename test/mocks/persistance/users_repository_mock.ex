defmodule Teebox.Persistance.UsersRepositoryMock do
  import Ecto.Changeset

  # State functions
  def start_link, do: Agent.start_link(fn -> %{} end, name: __MODULE__)

  def update_state(value), do: Agent.update(__MODULE__, fn _users -> value end)

  # State helpers
  def all, do: Map.values(users())

  def clear, do: update_state(%{})

  defp users, do: Agent.get(__MODULE__, &(&1))

  # Repository interface
  def create(%Ecto.Changeset{} = changeset) do
    user = apply_changes(changeset)
    Map.put(users(), user.id, user) |> update_state()

    {:ok, user}
  end

  def update(%Ecto.Changeset{} = changeset), do: create(changeset)

  def find_by_confirmation(email, confirmation_token) do
    find_by(%{email: email, confirmation_token: confirmation_token})
  end

  def find_by_email(email), do: find_by(%{email: email})

  defp find_by(%{} = attributes) do
    all() |> Enum.find(fn(user) -> match?(attributes, user) end)
  end
end
