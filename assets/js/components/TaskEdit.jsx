import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import api from '../api';

class TaskEdit extends Component {
  updateTask(time_worked) {
    let title = $('#create-task-title').val();
    let desc = $('#create-task-desc').val();
    let is_complete = $('#create-task-complete').is(':checked');
    let task = {
      title, desc, is_complete, time_worked
    }
    api.update_task(task, this.props.match.params.id, this.props.session.token)
  }

  render() {
    let {id} = this.props.match.params;
    let taskInfo = _.filter(this.props.tasks, task => {return task.id.toString() === id});
    if (taskInfo.length > 0) {
      let {desc, is_complete, time_worked, title} = taskInfo[0];
      return (
        <div className="column">
          <div className="row form-group">
            <label className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
              <input className="form-control" id="create-task-title" type="text"
                     defaultValue={title} />
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="create-task-desc" type="textarea"
                        defaultValue={desc} />
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-2 col-form-label">Time Worked</label>
            <div className="col-sm-10" style={{marginTop: "6px"}}>
              {time_worked}
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-2 col-form-label">Is complete?</label>
            <div className="col-sm-10">
              <input className="form-control" id="create-task-complete" type="checkbox"
                        defaultChecked={is_complete}/>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-10">
              <Link to={"/task/" + id} onClick={() => {this.updateTask(time_worked)}}>
                <button className="btn btn-secondary" id="register-submit-button">Save</button>
              </Link>
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
    session: state.session
  }
};

export default connect(mapStateToProps, null)(TaskEdit);
