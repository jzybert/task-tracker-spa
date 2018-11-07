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
        let header = $('#header');
        let alert = "<div class='alert alert-danger col-12 alert-dismissible fade show' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>Incorrect email and password.</div>";
        header.append(alert);
      }
    )
  }

  delete_session() {
    store.dispatch({
      type: DELETE_SESSION,
      session: null
    });
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
        let header = $('#header');
        let alert = "<div class='alert alert-danger col-12 alert-dismissible fade show' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>" +
          "Could not create user. Either this email is already registered or the password is not greater than 7 characters.</div>";
        header.append(alert);
      }
    )
  }

  create_task(title, desc) {
    let task = {
      title,
      desc,
      is_complete: false,
      time_worked: 0
    };

    this.post(
      "/api/v1/tasks",
      JSON.stringify({task}),
      response => {
        this.fetch_tasks();
      },
      (xhr, status, error) => {
        let header = $('#header');
        let alert = "<div class='alert alert-danger col-12 alert-dismissible fade show' role='alert'>" +
          "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
          "<span aria-hidden='true'>&times;</span></button>" +
          "Could not create task. Make sure you entered a title and description.</div>";
        header.append(alert);
      }
    )
  }

  get_task(task_id) {

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