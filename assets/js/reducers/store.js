import {createStore, combineReducers} from 'redux';
import {CREATE_NEW_SESSION, UPDATE_TASKS, UPDATE_USERS} from "../consts/types";

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
    default:
      return state;
  }
}

function session(state = null, action) {
  switch (action.type) {
    case CREATE_NEW_SESSION:
      return action.session;
    default:
      return state;
  }
}

function sessionCreated(state = false, action) {
  switch (action.type) {
    case CREATE_NEW_SESSION:
      return true;
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