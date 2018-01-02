defmodule Teebox.Accounts.Services.ApplicationsTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Accounts.Services.Applications

  def create_app_user, do: insert(:oauth_application_user, %{name: Applications.default_application_user_name()})

  test "default_application when user and application both exists returns application" do
    application_user = create_app_user()
    application = insert(:oauth_application, %{owner: application_user, name: Applications.default_application_name()})

    {:ok, found_app} = Applications.default_application()

    assert application_user.id == found_app.owner_id
    assert application.id == found_app.id
    assert Applications.default_application_name() == found_app.name
  end

  test "default_application when neither user nor application exist" do
    {:ok, created_app} = Applications.default_application()

    assert created_app.owner
    assert Applications.default_application_user_name() == created_app.owner.name
    assert Applications.default_application_name() == created_app.name
  end

  test "default_application when application does not exist" do
    application_user = create_app_user()

    {:ok, created_app} = Applications.default_application()

    assert application_user.id == created_app.owner_id
    assert Applications.default_application_name() == created_app.name
  end
end
