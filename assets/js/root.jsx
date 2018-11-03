import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';

export default function root_init(node) {
  ReactDOM.render(<Root tasks={window.tasks} />, node);
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks.tasks,
      users: [],
      session: null
    }
  }

  render() {
    return (
      <div>
        Welcome to Task Tracker!
      </div>
    );
  }
}