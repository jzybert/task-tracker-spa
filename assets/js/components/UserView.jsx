import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {Task} from './TaskList';

class UserView extends Component {
  render() {
    let {id} = this.props.match.params;

    let {assigned_tasks} = this.props;
    let assignedToUser = _.filter(assigned_tasks, at => {return at.user.toString() === id;});
    let taskList = _.map(assignedToUser, at => <Task key={at.task.id} task={at.task} />);

    let userInfo = _.filter(this.props.users, user => {return user.id.toString() === id});
    if (userInfo.length > 0) {
      let {email, admin} = userInfo[0];
      return (
        <div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><h5>Email:</h5>{email}</li>
            <li className="list-group-item"><h5>Admin?:</h5>{admin ? 'Yes' : 'No'}</li>
          </ul>
          <div className="col-12" style={{marginTop: "10px"}}>
            <h3>Task Assigned To User</h3>
            <div className="row">{taskList}</div>
          </div>
        </div>
      );
    } else {
      return (<div>User information not found.</div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    assigned_tasks: state.assigned_tasks
  }
};

export default connect(mapStateToProps)(UserView);