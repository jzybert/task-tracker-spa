import React from 'react';

export default function LoginButton(props) {
  let {root, sessionCreated, session} = props;

  function login() {
    let email = $('#login-email').val();
    let pw = $('#login-password').val();
    root.create_session(email, pw);
  }

  if (!sessionCreated) {
    return (
      <div className="form-inline my-2">
        <input id="login-email" type="email" placeholder="Enter email..." />
        <input id="login-password" type="password" placeholder="Enter password..." />
        <button className="btn btn-secondary" onClick={login}>Login</button>
      </div>
    );
  } else {
    return (
      <div className="form-inline my-2">
        <p>Welcome, User</p>
        <button className="btn btn-secondary">Logout</button>
      </div>
    );
  }
}