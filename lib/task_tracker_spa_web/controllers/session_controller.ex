defmodule TaskTrackerSpaWeb.SessionController do
  use TaskTrackerSpaWeb, :controller

  action_fallback TaskTrackerSpaWeb.FallbackController

  alias TaskTrackerSpa.Users
  alias TaskTrackerSpa.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    user = Users.get_and_auth_user(email, password)
    if user do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(TaskTrackerSpaWeb.Endpoint, "user_id", user.id),
          user_id: user.id
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:bad_request, Jason.encode!(%{}))
    end
  end
end