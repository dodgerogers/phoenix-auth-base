defmodule Teebox.Accounts.Message do
  import Bamboo.Email

  @doc """
  An email with a confirmation link in it.
  """
  # |> render_body("confirm.html", %{token: token})
  def confirm_request(user) do
    prep_mail(user.email)
    |> subject("Confirm your account")
    |> text_body("Here is your confirmation token: #{user.confirmation_token}")
  end

  def already_confirmed(user) do
    prep_mail(user.email)
    |> subject("Your account is already confirmed")
    |> text_body("You have already confirmed your account. Please login.")
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
