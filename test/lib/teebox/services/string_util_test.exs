defmodule Teebox.Services.StringUtilTest do
  use Teebox.ModelCase, async: true

  alias Teebox.Services.StringUtil

  describe "random_string" do
    test "generates a random string with 25 chars by default" do
      assert String.length(StringUtil.random_string()) == 25
    end

    test "generates a random string with given chars count" do
      assert String.length(StringUtil.random_string(5)) == 5
    end
  end
end
