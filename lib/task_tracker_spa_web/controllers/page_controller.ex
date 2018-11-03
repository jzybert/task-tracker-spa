defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller

  def index(conn, _params) do
    tasks = TaskTrackerSpa.Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:id, :title, :desc, :time_worked, :is_complete])))
    render conn, "index.html", tasks: tasks
  end
end
