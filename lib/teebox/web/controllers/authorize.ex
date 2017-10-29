defmodule Teebox.Web.Authorize do

  import Plug.Conn
  import Phoenix.Controller

  # This function can be used to customize the `action` function in
  # the controller so that only authenticated users can access each route.
  # See the [Authorization wiki page](https://github.com/riverrun/phauxth/wiki/Authorization)
  # for more information and examples.

  def current_resource(conn) do
    Guardian.Plug.current_resource(conn) |> handle_current_resource()
  end
  defp handle_current_resource(nil), do: {:error, nil}
  defp handle_current_resource(user), do: {:ok, user}

  def auth_action(%Plug.Conn{params: params} = conn, module) do
    with {:ok, current_resource} <- current_resource(conn) do
      apply(module, action_name(conn), [conn, params, current_resource])
    else
      _ -> error(conn, :unauthorized, 401)
    end
  end

  # Plug to only allow authenticated users to access the resource.
  # See the user controller for an example.
  def user_check(%Plug.Conn{} = conn, _opts) do
    with {:ok, _} <- current_resource(conn) do
      conn
    else
      _ -> error(conn, :unauthorized, 401)
    end
  end

  # Plug to only allow unauthenticated users to access the resource.
  # See the session controller for an example.
  def guest_check(%Plug.Conn{} = conn, _opts) do
    with {:error, _} <- current_resource(conn) do
      conn
    else
      _ -> put_status(conn, :unauthorized)
      |> render(Teebox.Web.AuthView, "logged_in.json", [])
      |> halt
    end
  end

  # Plug to only allow authenticated users with the correct id to access the resource.
  # See the user controller for an example.
  def id_check(%Plug.Conn{params: %{"id" => id}} = conn, _opts) do
    with {:ok, current_resource} <- current_resource(conn) do
      id == to_string(current_resource.id) and conn ||
        error(conn, :forbidden, 403)
    else
      _ -> error(conn, :unauthorized, 401)
    end
  end

  def error(conn, status, code) do
    put_status(conn, status)
    |> render(Teebox.Web.AuthView, "#{code}.json", [])
    |> halt
  end
end
