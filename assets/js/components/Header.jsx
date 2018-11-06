import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoginButton from './LoginButton';

class Header extends Component {
  render() {
    let {root, session, sessionCreated} = this.props;
    return (
      <div className="row my-2">
        <div className="col-4">
          <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Tracker</Link></h1>
        </div>
        <div className="col-2">
          <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
        </div>
        <div className="col-6">
          <LoginButton root={root} sessionCreated={sessionCreated} session={session} />
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
