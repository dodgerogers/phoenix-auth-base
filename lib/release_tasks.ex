defmodule :release_tasks do
  def migrate do
    {:ok, _} = Application.ensure_all_started(:teebox)
    path = Application.app_dir(:teebox, "priv/repo/migrations")
    Ecto.Migrator.run(Teebox.Repo, path, :up, all: true)
    :init.stop()
  end
end
