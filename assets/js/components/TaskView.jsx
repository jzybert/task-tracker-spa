import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class TaskView extends Component {
  render() {
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
        </div>
      );
    } else {
      return (<div>Task information not found.</div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks
  }
};

export default connect(mapStateToProps)(TaskView);