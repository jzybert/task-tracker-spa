import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import api from './api';

import Header from './components/Header';
import UserList from './components/UserList';
import TaskList from './components/TaskList';
import Register from './components/Register';
import CreateTask from './components/CreateTask';
import TaskView from './components/TaskView';
import UserView from './components/UserView';
import TaskEdit from './components/TaskEdit';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends Component {
  constructor(props) {
    super(props);

    api.fetch_users();
    api.fetch_tasks();
    api.fetch_assigned_tasks();
  }

  render() {
    return (
      <Router>
        <div>
          <div style={{margin: "0 25px"}}>
            <Header />
            <Route path="/" exact={true} render={() =>
              <TaskList />
            } />
            <Route path="/users" exact={true} render={() =>
              <UserList />
            } />
            <Route path="/register" exact={true} render={() =>
              <Register />
            } />
            <Route path="/create_task" exact={true} render={() =>
              <CreateTask />
            } />
            <Route path="/task/:id" exact={true} render={(props) =>
              <TaskView {...props} />
            } />
            <Route path="/user/:id" exact={true} render={(props) =>
              <UserView {...props} />
            } />
            <Route path="/task/:id/edit" exact={true} render={(props) =>
              <TaskEdit {...props} />
            } />
          </div>
        </div>
      </Router>
    );
  }
}