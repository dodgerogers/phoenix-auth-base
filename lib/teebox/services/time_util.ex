defmodule Teebox.Services.TimeUtil do
  # TODO: Seconds?
  def expired?(time, expiry_in_mins) do
    expiry_time = Timex.shift(time, [minutes: expiry_in_mins])
    Timex.before?(Timex.now, expiry_time)
  end
end
