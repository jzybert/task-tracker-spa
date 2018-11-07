defmodule TaskTrackerSpaWeb.AssignedTaskController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.AssignedTasks
  alias TaskTrackerSpa.AssignedTasks.AssignedTask

  action_fallback TaskTrackerSpaWeb.FallbackController

  def index(conn, _params) do
    assigned_tasks = AssignedTasks.list_assigned_tasks()
    render(conn, "index.json", assigned_tasks: assigned_tasks)
  end

  def create(conn, %{"assigned_task" => assigned_task_params}) do
    with {:ok, %AssignedTask{} = assigned_task} <- AssignedTasks.create_assigned_task(assigned_task_params) do
      assigned_task = AssignedTasks.get_assigned_task!(assigned_task.id)
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.assigned_task_path(conn, :show, assigned_task))
      |> render("show.json", assigned_task: assigned_task)
    end
  end

  def show(conn, %{"id" => id}) do
    assigned_task = AssignedTasks.get_assigned_task!(id)
    render(conn, "show.json", assigned_task: assigned_task)
  end

  def update(conn, %{"id" => id, "assigned_task" => assigned_task_params}) do
    assigned_task = AssignedTasks.get_assigned_task!(id)

    with {:ok, %AssignedTask{} = assigned_task} <- AssignedTasks.update_assigned_task(assigned_task, assigned_task_params) do
      render(conn, "show.json", assigned_task: assigned_task)
    end
  end

  def delete(conn, %{"id" => id}) do
    assigned_task = AssignedTasks.get_assigned_task!(id)

    with {:ok, %AssignedTask{}} <- AssignedTasks.delete_assigned_task(assigned_task) do
      send_resp(conn, :no_content, "")
    end
  end
end
