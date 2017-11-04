defmodule Teebox.Coherence.TokenDbStore do
  @user_schema Application.get_env(:coherence, :user_schema)
  @id_key Application.get_env(:coherence, :schema_key)

  def get_user_data(creds),
    do: Coherence.DbStore.get_user_data(creds, @user_schema, @id_key)
end
