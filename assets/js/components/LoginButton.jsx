import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import api from '../api';

class LoginButton extends Component {
  render() {
    let {sessionCreated, session} = this.props;

    function login() {
      let email = $('#login-email').val();
      let pw = $('#login-password').val();
      api.create_session(email, pw);
    }

    function logout() {
      api.delete_session();
    }

    if (!sessionCreated) {
      return (
        <div className="form-inline my-2">
          <input id="login-email" type="email" placeholder="Enter email..."/>
          <input id="login-password" type="password"
                 placeholder="Enter password..."/>
          <button className="btn btn-secondary" id="login-button" onClick={login}>Login</button>
          <Link to={"/register"}>
            <button className="btn btn-secondary" id="register-button">Register</button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="form-inline my-2">
          <Link to={"/user/" + session.user_id}>
            <div style={{marginTop: "5px"}}>
              <p>Your Page</p>
            </div>
          </Link>
          <button className="btn btn-secondary" id="logout-button" onClick={logout}>Logout</button>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    sessionCreated: state.sessionCreated
  }
};

export default connect(mapStateToProps)(LoginButton);