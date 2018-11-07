import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import api from '../api';

class CreateTask extends Component {
  create() {
    let title = $('#create-task-tile').val();
    let desc = $('#create-task-desc').val();
    api.create_task(title, desc);
  }

  render() {
    return (
      <div className="column">
        <div className="row form-group">
          <label className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input className="form-control" id="create-task-tile" type="text" placeholder="Enter title..."/>
          </div>
        </div>
        <div className="row form-group">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="create-task-desc" type="textarea" placeholder="Enter description..."/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-10">
            <Link to={"/"} onClick={this.create}>
              <button className="btn btn-secondary" id="register-submit-button">Create Task</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTask;