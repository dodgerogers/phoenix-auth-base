defmodule Teebox.Accounts.Services.PasswordEncryptionMock do
  def checkpw(password, password_hash) do
    hashpwsalt(password) == password_hash
  end

  def hashpwsalt(password) do
    password
    |> to_charlist()
    |> Enum.map(fn chr -> chr + 1 end)
    |> List.to_string()
  end

  def strong_password?(password) do
    NotQwerty123.PasswordStrength.strong_password?(password)
  end
end
