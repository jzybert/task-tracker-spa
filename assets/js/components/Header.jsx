import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import api from '../api';

import LoginButton from './LoginButton';

class Header extends Component {
  render() {
    let {session, sessionCreated} = this.props;
    return (
      <div className="row my-2" id="header">
        <div className="col-4">
          <h1><Link to={"/"} onClick={() => {api.fetch_tasks()}}>Task Tracker</Link></h1>
        </div>
        <div className="col-2 text-center">
          <div className="row">
            <p style={{marginTop: "17px", marginRight: "10px"}}>
              <Link to={"/"} onClick={() => {api.fetch_tasks()}}>Tasks</Link>
            </p>
            <p style={{marginTop: "17px"}}>
              <Link to={"/users"} onClick={() => {api.fetch_users()}}>Users</Link>
            </p>
          </div>
        </div>
        <div className="col-6">
          <LoginButton sessionCreated={sessionCreated} session={session} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session,
    sessionCreated: state.sessionCreated
  }
};

export default connect(mapStateToProps, null)(Header);
