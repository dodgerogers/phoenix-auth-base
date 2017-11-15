defmodule Teebox.Accounts.Message do
  import Bamboo.Email
  alias Teebox.Mailer

  @doc """
  An email with a confirmation link in it.
  """
  def confirm_request(user) do
    prep_mail(user.email)
    |> subject("Confirm your account")
    |> text_body("Here is your confirmation token: #{user.confirmation_token}")
    |> Mailer.deliver_now
  end

  # def reset_request(address, key) do
  #   prep_mail(address)
  #   |> subject("Reset your password")
  #   |> text_body("Password reset token: #{key}")
  #   |> Mailer.deliver_now
  # end

  defp prep_mail(address) do
    new_email()
    |> to(address)
    |> from("admin@example.com") # TODO: config
  end
end
