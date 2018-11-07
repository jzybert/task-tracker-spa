import $ from 'jquery';

import store from './reducers/store';
import {CREATE_NEW_SESSION, UPDATE_TASKS, UPDATE_USERS} from "./consts/types";

class TaskTrackerServer {
  get(path, success_callback, error_callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: success_callback,
      error: error_callback
    })
  }

  post(path, data, success_callback, error_callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
      success: success_callback,
      error: error_callback
    })
  }

  create_session(email, password) {
    this.post(
      "/api/v1/sessions",
      JSON.stringify({email, password}),
      response => {
        store.dispatch({
          type: CREATE_NEW_SESSION,
          session: response.data
        });
      },
      (xhr, status, error) => {
        console.log("Error: could not create session");
      }
    )
  }

  fetch_tasks() {
    this.get(
      "/api/v1/tasks",
      response => {
        store.dispatch({
          type: UPDATE_TASKS,
          tasks: response.data
        });
      },
      (xhr, status, error) => {
        console.log("Error: could not fetch tasks");
      }
    )
  }

  fetch_users() {
    this.get(
      "/api/v1/users",
      response => {
        store.dispatch({
          type: UPDATE_USERS,
          users: response.data
        });
      },
      (xhr, status, error) => {
        console.log("Error: could not fetch users");
      }
    )
  }
}

export default new TaskTrackerServer();