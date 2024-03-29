defmodule Teebox.Accounts.Message do
  import Bamboo.Email

  use Bamboo.Phoenix, view: Teebox.Web.EmailView

  def confirm_request(user) do
    prep_mail(user)
    |> subject("Confirm your account")
    |> render("confirm_request.html")
  end

  def already_confirmed(user) do
    prep_mail(user)
    |> subject("Your account is already confirmed")
    |> render("already_confirmed.html")
  end

  def reset_password(user) do
    prep_mail(user)
    |> subject("Reset your password")
    |> render("reset_password.html")
  end

  defp prep_mail(user) do
    new_email()
    |> to(user.email)
    |> assign(:user, user)
    |> from("admin@example.com") # TODO: config
    |> put_html_layout({Teebox.Web.LayoutView, "email.html"})
  end
end
