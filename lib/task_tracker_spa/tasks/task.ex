defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :desc, :string, null: false
    field :is_complete, :boolean, default: false, null: false
    field :time_worked, :time, null: false
    field :title, :string, null: false

    has_many :assigned_tasks, TaskTrackerSpa.AssignedTasks.AssignedTask

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:title, :desc, :time_worked, :is_complete])
    |> validate_required([:title, :desc, :time_worked, :is_complete])
  end
end
