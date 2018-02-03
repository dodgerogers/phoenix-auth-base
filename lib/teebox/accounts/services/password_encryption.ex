defmodule Teebox.Accounts.Services.PasswordEncryption do
  def checkpw(password, password_hash) do
    Comeonin.Pbkdf2.checkpw(password, password_hash)
  end

  def hashpwsalt(password) do
    Comeonin.Pbkdf2.hashpwsalt(password)
  end
end
