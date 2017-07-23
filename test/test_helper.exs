ExUnit.start

Ecto.Adapters.SQL.Sandbox.mode(Teebox.Repo, :manual)

{:ok, _} = Application.ensure_all_started(:ex_machina)

Faker.start

Teebox.Persistance.UsersRepositoryMock.start_link()
