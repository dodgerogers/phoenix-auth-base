defmodule :release_tasks do
  def migrate do
    {:ok, _} = Application.ensure_all_started(:ecto)
    {:ok, _} = Application.ensure_all_started(:postgrex)

    Application.load(:teebox)
    Teebox.Repo.start_link

    path = Application.app_dir(:teebox, "priv/repo/migrations")

    Ecto.Migrator.run(Teebox.Repo, path, :up, all: true)

    :init.stop()
  end
end
