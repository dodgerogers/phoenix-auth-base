defmodule Teebox.Accounts.Services.Password do
  use Teebox.Web, :model

  alias Teebox.Accounts.Schemas.User

  @password_encryption Application.get_env(:teebox, :password_encryption)
  @password_fields [:password, :password_confirmation]

  def changeset(%User{} = user, %{} = params) do
    user
    |> cast(params, @password_fields)
    |> validate_required(@password_fields)
    |> validate_passwords_match()
    |> validate_password_strength()
    |> put_password_hash()
    |> change(%{reset_password_token: nil})
    |> change(%{reset_password_sent_at: nil})
  end

  def checkpw(password, password_hash) do
    @password_encryption.checkpw(password, password_hash)
  end

  def hashpwsalt(password) do
    @password_encryption.hashpwsalt(password)
  end

  defp validate_passwords_match(%Ecto.Changeset{changes: %{password: pw, password_confirmation: pw}} = changeset) do
    changeset
  end
  defp validate_passwords_match(%Ecto.Changeset{changes: %{password: _pw, password_confirmation: _pwc}} = changeset) do
    add_error(changeset, :password_confirmation, "Passwords do not match")
  end
  defp validate_passwords_match(%Ecto.Changeset{} = changeset), do: changeset

  defp validate_password_strength(changeset, options \\ []) do
    validate_change(changeset, :password, fn _, password ->
      with {:ok, _} <- strong_password?(password) do
        []
      else
        {:error, msg} -> [{:password, options[:message] || msg}]
      end
    end)
  end

  defp strong_password?(password) do
    NotQwerty123.PasswordStrength.strong_password?(password)
  end

  defp put_password_hash(%Ecto.Changeset{valid?: true, changes: %{password: pw}} = changeset) do
    changeset
    |> change(%{password_hash: hashpwsalt(pw)})
  end
  defp put_password_hash(%Ecto.Changeset{} = changeset), do: changeset
end
