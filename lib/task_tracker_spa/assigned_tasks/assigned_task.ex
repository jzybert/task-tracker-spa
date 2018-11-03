defmodule TaskTrackerSpa.AssignedTasks.AssignedTask do
  use Ecto.Schema
  import Ecto.Changeset


  schema "assigned_tasks" do
    belongs_to :user, TaskTrackerSpa.Users.User
    belongs_to :task, TaskTrackerSpa.Tasks.Task

    timestamps()
  end

  @doc false
  def changeset(assigned_task, attrs) do
    assigned_task
    |> cast(attrs, [:user_id, :task_id])
    |> unique_constraint(:user_id, name: :assigned_tasks_user_id_task_id_index)
    |> validate_required([:user_id, :task_id])
  end
end
