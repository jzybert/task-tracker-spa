import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import Header from './components/Header';
import UserList from './components/UserList';
import TaskList from './components/TaskList';

export default function root_init(node) {
  ReactDOM.render(<Root tasks={window.tasks} />, node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      users: [],
      session: null
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact={true} render={() =>
            <TaskList tasks={this.state.tasks} />
          } />
          <Route path="/users" exact={true} render={() =>
            <UserList tasks={this.state.users} />
          } />
        </div>
      </Router>
    );
  }
}