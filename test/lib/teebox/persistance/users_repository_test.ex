defmodule Teebox.Persistance.UserRepositoryTest do
  use Teebox.ModelCase

  import Teebox.Factory
  alias Teebox.Persistance.UsersRepository

  @email "email@email.com"
  @confirmation_token "token"

  test "find_by_confirmation returns user when user exists with given params" do
    user = insert(:user, email: @email, confirmation_token: @confirmation_token)

    found_user = UsersRepository.find_by_confirmation(@email, @confirmation_token)

    assert user == found_user
  end

  test "find_by_confirmation returns nil when user does not exist" do
    found_user = UsersRepository.find_by_confirmation(@email, @confirmation_token)

    refute found_user
  end
end
