defmodule TaskTrackerSpaWeb.AssignedTaskControllerTest do
  use TaskTrackerSpaWeb.ConnCase

  alias TaskTrackerSpa.AssignedTasks
  alias TaskTrackerSpa.AssignedTasks.AssignedTask

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:assigned_task) do
    {:ok, assigned_task} = AssignedTasks.create_assigned_task(@create_attrs)
    assigned_task
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all assigned_tasks", %{conn: conn} do
      conn = get(conn, Routes.assigned_task_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create assigned_task" do
    test "renders assigned_task when data is valid", %{conn: conn} do
      conn = post(conn, Routes.assigned_task_path(conn, :create), assigned_task: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.assigned_task_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.assigned_task_path(conn, :create), assigned_task: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update assigned_task" do
    setup [:create_assigned_task]

    test "renders assigned_task when data is valid", %{conn: conn, assigned_task: %AssignedTask{id: id} = assigned_task} do
      conn = put(conn, Routes.assigned_task_path(conn, :update, assigned_task), assigned_task: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.assigned_task_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, assigned_task: assigned_task} do
      conn = put(conn, Routes.assigned_task_path(conn, :update, assigned_task), assigned_task: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete assigned_task" do
    setup [:create_assigned_task]

    test "deletes chosen assigned_task", %{conn: conn, assigned_task: assigned_task} do
      conn = delete(conn, Routes.assigned_task_path(conn, :delete, assigned_task))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.assigned_task_path(conn, :show, assigned_task))
      end
    end
  end

  defp create_assigned_task(_) do
    assigned_task = fixture(:assigned_task)
    {:ok, assigned_task: assigned_task}
  end
end
