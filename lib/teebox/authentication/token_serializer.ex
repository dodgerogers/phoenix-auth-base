defmodule Teebox.Authentication.TokenSerializer do
  @behaviour Guardian.Serializer
  @user_repo Application.get_env(:teebox, :user_repo)

  alias Teebox.Accounts.User

  def for_token(%User{} = user), do: { :ok, "User:#{user.id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("User:" <> id), do: { :ok, @user_repo.find_by_id(String.to_integer(id)) }
  def from_token(_), do: { :error, "Unknown resource type" }
end
