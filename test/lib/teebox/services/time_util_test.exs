defmodule Teebox.Services.TimeUtilTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Services.TimeUtil

  describe "expired?" do
    setup do
      datetime = Timex.shift(Timex.now, minutes: -2)

      {:ok, %{datetime: datetime}}
    end

    test "returns false when time + expiration duration is before current time", %{datetime: datetime} do
      one_minute_expiry_duration = 1
      refute TimeUtil.expired?(datetime, one_minute_expiry_duration)
    end

    test "returns true when time + expiration duration is after current time", %{datetime: datetime} do
      two_minutes_expiry_duration = 3
      assert TimeUtil.expired?(datetime, two_minutes_expiry_duration)
    end
  end
end
