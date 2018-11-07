defmodule TaskTrackerSpaWeb.TaskController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.Tasks
  alias TaskTrackerSpa.Tasks.Task
  alias TaskTrackerSpa.AssignedTasks

  action_fallback TaskTrackerSpaWeb.FallbackController

  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    render(conn, "index.json", tasks: tasks)
  end

  def create(conn, %{"task" => task_params}) do
    task_params = Map.put(task_params, "time_worked", ~T[00:00:00.000])
    with {:ok, %Task{} = task} <- Tasks.create_task(task_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.task_path(conn, :show, task))
      |> render("show.json", task: task)
    end
  end

  def show(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)
    render(conn, "show.json", task: task)
  end

  def update(conn, %{"id" => id, "task" => task_params, "token" => token}) do
    {:ok, user_id} = Phoenix.Token.verify(TaskTrackerSpaWeb.Endpoint, "user_id", token, max_age: 86400)
    task_ids_for_user = Enum.map(AssignedTasks.list_assigned_tasks_for_user(user_id), fn(at) -> at.task.id end)
    is_task_assigned_to_user = String.to_integer(id) in task_ids_for_user
    if is_task_assigned_to_user do
      with {:ok, time_worked} <- Time.new(String.to_integer(task_params["hours"]), String.to_integer(task_params["minutes"]), 0, 0) do
        task = Tasks.get_task!(id)
        current_time_worked = Map.get(task, :time_worked)
        task_params = %{:time_worked => Time.add(Time.add(time_worked, current_time_worked.hour * 3600), current_time_worked.minute * 60)}
        with {:ok, %Task{} = task} <- Tasks.update_task(task, task_params) do
          render(conn, "show.json", task: task)
        end
      end
    else
      send_resp(conn, :unauthorized, "You are not assigned to this task. Failed to add time worked.")
    end
  end

  def delete(conn, %{"id" => id}) do
    task = Tasks.get_task!(id)

    with {:ok, %Task{}} <- Tasks.delete_task(task) do
      send_resp(conn, :no_content, "")
    end
  end
end
