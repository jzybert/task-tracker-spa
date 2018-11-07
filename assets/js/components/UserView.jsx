import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

class UserView extends Component {
  render() {
    let {id} = this.props.match.params;
    let userInfo = _.filter(this.props.users, user => {return user.id.toString() === id});
    if (userInfo.length > 0) {
      let {email, admin} = userInfo[0];
      return (
        <div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><h5>Email:</h5>{email}</li>
            <li className="list-group-item"><h5>Admin?:</h5>{admin ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      );
    } else {
      return (<div>User information not found.</div>);
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

export default connect(mapStateToProps)(UserView);