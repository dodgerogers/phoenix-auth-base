defmodule Teebox.Accounts.OmniAuthLoginMock do
  alias Ueberauth.Auth
  import Teebox.Factory

  def call(%Auth{} = _auth), do: {:ok, build(:user, id: 1)}
  def call(_), do: {:error, "Invalid Omniauth hash provided"}
end
