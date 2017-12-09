defmodule Teebox.Persistance.BaseRepository do
  defmacro __using__(_) do
    quote do
      alias Ecto.Changeset
      import Teebox.Repo

      def create(%Changeset{} = changeset), do: Teebox.Repo.insert(changeset)
      defoverridable create: 1

      def update(%Changeset{} = changeset), do: Teebox.Repo.update(changeset)
      defoverridable update: 1
    end
  end
end
