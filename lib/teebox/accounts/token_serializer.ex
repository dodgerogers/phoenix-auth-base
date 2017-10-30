defmodule Teebox.Accounts.TokenSerializer do
  @behaviour Guardian.Serializer
  @user_repo Application.get_env(:teebox, :user_repo)

  alias Teebox.Accounts.User
  @unknown_resource "Unknown resource type"

  def for_token(%User{} = user), do: {:ok, "data:#{user.id}"}
  def for_token(_), do: {:error, @unknown_resource}

  def from_token("data:" <> id), do: {:ok, @user_repo.find_by_id(String.to_integer(id))}
  def from_token(_), do: {:error, @unknown_resource}
end
