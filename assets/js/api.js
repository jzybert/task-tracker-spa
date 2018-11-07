import $ from 'jquery';

import store from './reducers/store';
import {CREATE_NEW_SESSION, UPDATE_TASKS, UPDATE_USERS} from "./consts/types";

class TaskTrackerServer {
  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: response => {
        store.dispatch({
          type: CREATE_NEW_SESSION,
          session: response.data
        });
      }
    });
  }

  fetch_path(path, success_callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: success_callback
    });
  }

  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      response => {
        store.dispatch({
          type: UPDATE_TASKS,
          tasks: response.data
        });
      }
    )
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      response => {
        store.dispatch({
          type: UPDATE_USERS,
          users: response.data
        });
      }
    )
  }
}

export default new TaskTrackerServer();