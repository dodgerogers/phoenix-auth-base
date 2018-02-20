defmodule Teebox.Web.Plugs.ValidateParamsTest do
  use Teebox.Web.ConnCase

  alias Teebox.Web.Plugs.ValidateParams

  defmodule MockValidator do
    def mock_changeset() do
      {%{}, %{field: :string}}
      |> Ecto.Changeset.cast(%{field: ""}, [:field])
    end

    def valid(_params), do: mock_changeset()

    def invalid(_params) do
      mock_changeset()
      |> add_error(:field, "empty")
    end
  end

  test "conn is not halted when changeset is valid" do
    opts = ValidateParams.init({MockValidator, :valid})
    conn = build_conn()
    new_conn = conn |> ValidateParams.call(opts)

    assert new_conn == conn
    refute new_conn.halted
  end

  test "conn is halted when changeset is invalid" do
    opts = ValidateParams.init({MockValidator, :invalid})
    conn = build_conn() |> ValidateParams.call(opts)

    assert conn.halted
  end
end
