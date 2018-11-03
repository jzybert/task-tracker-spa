defmodule TaskTrackerSpaWeb.AssignedTaskView do
  use TaskTrackerSpaWeb, :view
  alias TaskTrackerSpaWeb.AssignedTaskView

  def render("index.json", %{assigned_tasks: assigned_tasks}) do
    %{data: render_many(assigned_tasks, AssignedTaskView, "assigned_task.json")}
  end

  def render("show.json", %{assigned_task: assigned_task}) do
    %{data: render_one(assigned_task, AssignedTaskView, "assigned_task.json")}
  end

  def render("assigned_task.json", %{assigned_task: assigned_task}) do
    %{id: assigned_task.id}
  end
end
