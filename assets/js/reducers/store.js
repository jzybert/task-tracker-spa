import {createStore, combineReducers} from 'redux';
import {
  CREATE_NEW_SESSION, UPDATE_TASKS, UPDATE_USERS, DELETE_SESSION,
  UPDATE_ASSIGNED_TASKS
} from "../consts/types";

// let initialState = {
//   tasks: [],
//   users: [],
//   assigned_tasks: [],
//   session: null,
//   sessionCreated: false
// };

function copyState(state) {
  return Object.assign({}, state);
}

function tasks(state = [], action) {
  switch (action.type) {
    case UPDATE_TASKS:
      return action.tasks;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case UPDATE_USERS:
      return action.users;
    default:
      return state;
  }
}

function assigned_tasks(state = [], action) {
  switch (action.type) {
    case UPDATE_ASSIGNED_TASKS:
      return action.assigned_tasks;
    default:
      return state;
  }
}

function getCookie(name) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let ii = 0; ii < ca.length; ii++) {
    let c = ca[ii];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return "";
}

function initialSession() {
  let token = getCookie("token=");
  let user_id = getCookie("user_id=");

  if (token && user_id) {
    return {token, user_id};
  } else {
    return null;
  }
}

function initialSessionCreated() {
  let token = getCookie("token=");
  let user_id = getCookie("user_id=");

  return token && user_id;
}

function session(state = initialSession(), action) {
  switch (action.type) {
    case CREATE_NEW_SESSION:
      if (action.session) {
        document.cookie = "token=" + action.session.token;
        document.cookie = "user_id=" + action.session.user_id;
      }
      return action.session;
    case DELETE_SESSION:
      document.cookie = "token=";
      document.cookie = "user_id=";
      return null;
    default:
      return state;
  }
}

function sessionCreated(state = initialSessionCreated(), action) {
  switch (action.type) {
    case CREATE_NEW_SESSION:
      return true;
    case DELETE_SESSION:
      return false;
    default:
      return state;
  }
}

function rootReducer(state0, action) {
  let reducer = combineReducers({tasks, users, assigned_tasks, session, sessionCreated});
  return reducer(state0, action);
}

let store = createStore(rootReducer);
export default store;