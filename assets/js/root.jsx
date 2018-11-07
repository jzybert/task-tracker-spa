import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';

import api from './api';

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

    api.fetch_users();
    api.fetch_tasks();
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
          </div>
        </div>
      </Router>
    );
  }
}