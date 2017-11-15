defmodule Teebox.Persistance.UsersRepositoryMock do
  import Ecto.Changeset

  def start_link, do: Agent.start_link(fn -> %{} end, name: __MODULE__)

  def update(value), do: Agent.update(__MODULE__, fn _users -> value end)

  def all, do: Map.values(users())

  def clear, do: update(%{})

  defp users, do: Agent.get(__MODULE__, &(&1))

  def find_by_id(id), do: Map.get(users(), id)

  def create(%Ecto.Changeset{} = changeset) do
    user = apply_changes(changeset)
    Map.put(users(), user.id, user) |> update()

    {:ok, user}
  end

  defp find_by(%{} = attributes) do
    all() |> Enum.find(fn(user) -> match?(attributes, user) end)
  end
end
