import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import api from '../api';

class TaskView extends Component {
  assignToUser() {
    let {users} = this.props;
    let assignee = $('#task-assign').val();
    let userInfo = _.filter(users, user => {
      return user.email === assignee;
    })[0];

    if (userInfo) {
      //api.assign_task_to_user(userInfo.id, this.props.match.params.id);
    }
  }

  render() {
    let {users} = this.props;
    let userOptions = _.map(users, user => {
      return <option key={user.id}>{user.email}</option>;
    });

    let {id} = this.props.match.params;
    let taskInfo = _.filter(this.props.tasks, task => {return task.id.toString() === id});
    if (taskInfo.length > 0) {
      let {desc, is_complete, time_worked, title} = taskInfo[0];
      return (
        <div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><h5>Title:</h5>{title}</li>
            <li className="list-group-item"><h5>Description:</h5>{desc}</li>
            <li className="list-group-item"><h5>Complete?:</h5>{is_complete ? 'Yes' : 'No'}</li>
            <li className="list-group-item"><h5>Time Worked:</h5>{time_worked}</li>
          </ul>
          <div className="column" style={{marginTop: "20px"}}>
            <div className="row form-group">
              <label className="col-sm-2 col-form-label">Assign to:</label>
              <div className="col-sm-4">
                <select className="form-control" id="task-assign">
                  <option defaultValue>Choose a user to assign this task to</option>
                  {userOptions}
                </select>
              </div>
              <div className="col-sm-4">
                <Link to={"/"} onClick={() => {this.assignToUser()}}>
                  <button className="btn btn-secondary">Assign to User</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (<div>Task information not found.</div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    users: state.users
  }
};

export default connect(mapStateToProps)(TaskView);