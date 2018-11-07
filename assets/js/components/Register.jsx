import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import api from '../api';

class Register extends Component {
  register() {
    let email = $('#register-email').val();
    let pw = $('#register-pw').val();
    let pwConf = $('#register-pw-conf').val();
    api.create_user(email, pw, pwConf);
  }

  render() {
    return (
      <div className="column">
        <div className="row form-group">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input className="form-control" id="register-email" type="email" placeholder="Email"/>
          </div>
        </div>
        <div className="row form-group">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input className="form-control" id="register-pw" type="password" placeholder="Password"/>
          </div>
        </div>
        <div className="row form-group">
          <label className="col-sm-2 col-form-label">Confirm Password</label>
          <div className="col-sm-10">
            <input className="form-control" id="register-pw-conf" type="password" placeholder="Confirm password"/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-10">
            <Link to={"/"} onClick={this.register}>
              <button className="btn btn-secondary" id="register-submit-button">Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
