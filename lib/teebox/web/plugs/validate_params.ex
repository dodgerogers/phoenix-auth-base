defmodule Teebox.Web.Plugs.ValidateParams do
  import Plug.Conn

  use Teebox.Web, :controller

  def init(opts), do: opts

  def call(%Plug.Conn{params: params} = conn, {module_name, method_name} = _opts) do
    apply(module_name, method_name, [params])
    |> handle_validation(conn)
  end
  def call(%Plug.Conn{} = conn, _opts), do: conn

  defp handle_validation(%Ecto.Changeset{valid?: true} = _, conn), do: conn
  defp handle_validation(_ = changeset, conn) do
    conn
    |> render_error(changeset)
    |> halt()
  end
end
