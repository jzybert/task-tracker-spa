defmodule TaskTrackerSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :admin, :boolean, default: false, null: false
    field :email, :string, null: false
    field :password_hash, :string, null: false

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :password_hash, :admin])
    |> unique_constraint(:email)
    |> validate_required([:email, :password_hash, :admin])
  end
end
