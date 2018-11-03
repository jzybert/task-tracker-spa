import React from 'react';
import _ from 'lodash';

export default function TaskList(props) {
  let {root, tasks} = props;
  let taskList = _.map(tasks, task => <Task key={task.id} task={task} root={root} />);
  return <div className="row">{taskList}</div>;
}

function Task(props) {
  let {root, task} = props;

  return (
    <div className="card col-4">
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