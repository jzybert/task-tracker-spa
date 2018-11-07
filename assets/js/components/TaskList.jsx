import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class TaskList extends Component {
  render() {
    let {tasks, sessionCreated} = this.props;
    let taskList = _.map(tasks, task => <Task key={task.id} task={task} />);
    return (
      <div className="col-12">
        {!sessionCreated ?
        <Link to={"/create_task"}>
          <button className="btn btn-secondary">Create Task</button>
        </Link>
        : null}
        <div className="row">{taskList}</div>
      </div>
    );
  }
}

function Task(props) {
  let {task} = props;

  return (
    <div className="card col-3" style={{margin: "5px"}}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        {task.is_complete ?
          <h6 className="card-subtitle mb-2 text-muted">Complete</h6> :
          <h6 className="card-subtitle mb-2 text-muted">Not Complete</h6>}
        <p className="card-text">{task.desc}</p>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    sessionCreated: state.sessionCreated
  }
};

export default connect(mapStateToProps, null)(TaskList);