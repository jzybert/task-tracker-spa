import $ from 'jquery';

import store from './reducers/store';
import {
  CREATE_NEW_SESSION, DELETE_SESSION, UPDATE_TASKS,
  UPDATE_USERS
} from "./consts/types";

class TaskTrackerServer {
  request(path, method, data, success_callback, error_callback) {
    $.ajax(path, {
      method: method,
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: data,
      success: success_callback,
      error: error_callback
    })
  }

  get(path, success_callback, error_callback) {
    this.request(path, "get", "", success_callback, error_callback);
  }

  post(path, data, success_callback, error_callback) {
    this.request(path, "post", data, success_callback, error_callback);
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

  create_user(email, password, passwordConfirmation) {
    let user = {
      email,
      password,
      password_confirmation: passwordConfirmation
    };

    this.post(
      "/api/v1/users",
      JSON.stringify({user}),
      response => {
        this.fetch_users();
        this.create_session(email, password);
      },
      (xhr, status, error) => {
        console.log("Error: could not create user")
      }
    )
  }

  delete_session() {
    store.dispatch({
      type: DELETE_SESSION,
      session: null
    });
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