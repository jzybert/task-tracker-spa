import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import Header from './components/Header';
import UserList from './components/UserList';
import TaskList from './components/TaskList';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
      session: null,
      sessionCreated: false
    };

    this.fetch_users();
    this.fetch_tasks();
  }

  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: response => {
        let updatedState = _.assign({}, this.state, {
          session: response.data,
          sessionCreated: true
        });
        this.setState(updatedState);
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
        let updatedState = _.assign({}, this.state, {
          tasks: response.data
        });
        this.setState(updatedState);
      }
    )
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      response => {
        let updatedState = _.assign({}, this.state, {
          users: response.data
        });
        this.setState(updatedState);
      }
    )
  }

  render() {
    return (
      <Router>
        <div>
          <div style={{margin: "0 25px"}}>
            <Header root={this} />
            <Route path="/" exact={true} render={() =>
              <TaskList tasks={this.state.tasks} />
            } />
            <Route path="/users" exact={true} render={() =>
              <UserList users={this.state.users} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}