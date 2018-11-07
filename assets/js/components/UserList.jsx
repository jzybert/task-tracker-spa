import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class UserList extends Component {
  render() {
    let {users} = this.props;
    let rows = _.map(users, user => <User key={user.id} user={user}/>);

    return (
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Email</th>
              <th>Admin?</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function User(props) {
  let {user} = props;

  return (
    <tr>
      <td>
        <Link to={"/user/" + user.id}>
          {user.email}
        </Link>
      </td>
      <td>{user.admin ? "yes" : "no"}</td>
    </tr>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
};

export default connect(mapStateToProps, null)(UserList);