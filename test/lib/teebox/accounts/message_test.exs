defmodule Teebox.Accounts.MessageTest do
  use ExUnit.Case
  use Bamboo.Test

  import Teebox.Factory

  alias Teebox.Accounts.Message

  setup do
    user = build(:user, confirmation_token: "token")

    {:ok, %{user: user}}
  end

  test "sends confirmation request email", %{user: user} do
    sent_email = Message.confirm_request(user)

    assert sent_email.subject =~ "Confirm your account"
    assert sent_email.text_body =~ user.confirmation_token
    assert_delivered_email sent_email
  end

  # test "sends no user found message for password reset attempt" do
  #   sent_email = Message.reset_request(@email, nil)
  #
  #   assert sent_email.text_body =~ "but no user is associated with the email you provided"
  # end
  #
  # test "sends reset password request email", %{key: key} do
  #   sent_email = Message.reset_request(@email, key)
  #
  #   assert sent_email.subject =~ "Reset your password"
  #   assert sent_email.text_body =~ key
  #   assert_delivered_email Message.reset_request(@email, key)
  # end
  #
  # test "sends receipt confirmation email" do
  #   sent_email = Message.confirm_success(@email)
  #
  #   assert sent_email.text_body =~ "account has been confirmed"
  #   assert_delivered_email Message.confirm_success(@email)
  # end
  #
  # test "sends password reset email" do
  #   sent_email = Message.reset_success(@email)
  #
  #   assert sent_email.text_body =~ "password has been reset"
  #   assert_delivered_email Message.reset_success(@email)
  # end
end
