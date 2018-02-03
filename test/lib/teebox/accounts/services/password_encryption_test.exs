defmodule Teebox.Accounts.Services.PasswordEncryptionTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Accounts.Services.PasswordEncryption

  describe "checkpw" do
    setup do
      password = "password"
      hashed_password = PasswordEncryption.hashpwsalt(password)
      refute hashed_password == password

      {:ok, %{hashed_password: hashed_password, password: password}}
    end

    test "returns true when password matches hash", %{hashed_password: hashed_pw, password: pw} do
      assert PasswordEncryption.checkpw(pw, hashed_pw)
    end

    test "returns false when password does not match hash", %{hashed_password: hashed_pw, password: pw} do
      refute PasswordEncryption.checkpw(pw <> "1", hashed_pw)
    end
  end
end
