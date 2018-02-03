defmodule Teebox.Services.StringUtil do
  def random_string(length \\ 25) do
    length
    |> :crypto.strong_rand_bytes
    |> Base.url_encode64
    |> binary_part(0, length)
  end
end
