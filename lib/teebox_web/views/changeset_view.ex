defmodule TeeboxWeb.ChangesetView do
  use TeeboxWeb, :view

  @doc """
  Traverses and translates changeset errors.

  See `Ecto.Changeset.traverse_errors/2` for more details.
  """
  def translate_errors(changeset) do
    Ecto.Changeset.traverse_errors(changeset, &translate_error/1)
  end

  def render("error.json", %{changeset: %Ecto.Changeset{} = changeset}) do
    # When encoded, the changeset returns its errors
    # as a JSON object. So we just pass it forward.
    %{error: translate_errors(changeset)}
  end

  def changeset_to_error_string(changeset) do
    Enum.map(changeset.errors, fn {k, v} ->
       "#{Phoenix.Naming.humanize(k)} #{translate_error(v)}"
    end) |> Enum.join(". ")
  end
end
