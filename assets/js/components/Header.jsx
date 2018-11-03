import React from 'react';
import {Link} from 'react-router-dom';

export default function Header(props) {
  let {root} = props;

  let session_view = (
    <div className="form-inline my-2">
      <input id="login-email" type="email" placeholder="Enter email..." />
      <input id="login-password" type="password" placeholder="Enter password..." />
      <button className="btn btn-secondary">Login</button>
    </div>
  );

  return (
    <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Tracker</Link></h1>
      </div>
      <div className="col-2">
        <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
      </div>
      <div className="col-6">
        {session_view}
      </div>
    </div>
  );

}