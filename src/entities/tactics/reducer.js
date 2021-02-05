import { combineReducers } from 'redux';
import {
  CREATE_TACTIC_FULFILLED,
  CREATE_TACTIC_PENDING,
  CREATE_TACTIC_REJECTED,
  FETCH_TACTICS_FULFILLED,
  FETCH_TACTICS_PENDING,
  FETCH_TACTICS_REJECTED,
  DELETE_TACTIC_FULFILLED,
} from './constants';

const tactic = (state, action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED: {
      const id = action.payload.data.id;
      return { [id]: { id, ...action.meta.data, ...state } };
    }
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED:
      return { ...state, ...tactic(undefined, action) };
    default:
      return state;
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED:
      return [action.payload.data.id, ...state];
    case FETCH_TACTICS_FULFILLED:
      return [...state, ...action.payload.result];
    case DELETE_TACTIC_FULFILLED:
      return state.filter(id => id !== action.meta.id);
    default:
      return state;
  }
};

const status = (state = { isFetching: false, isCreating: false, error: false }, action) => {
  switch (action.type) {
    case FETCH_TACTICS_PENDING:
      return { ...state, isFetching: true };
    case FETCH_TACTICS_REJECTED:
      return { ...state, isFetching: false, error: true };
    case FETCH_TACTICS_FULFILLED:
      return { ...state, isFetching: false, error: false };
    case CREATE_TACTIC_PENDING:
      return { ...state, isCreating: true };
    case CREATE_TACTIC_FULFILLED:
    case CREATE_TACTIC_REJECTED:
      return { ...state, isCreating: false };
    default:
      return state;
  }
};

export default combineReducers({ byId, items, status });
