import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

import {
  CREATE_TACTIC_PENDING,
  CREATE_TACTIC_FULFILLED,
  CREATE_TACTIC_REJECTED,
  FETCH_TACTICS_PENDING,
  FETCH_TACTICS_FULFILLED,
  FETCH_TACTICS_REJECTED,
  DELETE_TACTIC_PENDING,
  DELETE_TACTIC_FULFILLED,
  DELETE_TACTIC_REJECTED,
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
    default: {
      if (get(action, 'payload.entities.tactics')) {
        return merge({}, state, action.payload.entities.tactics);
      }
      return state;
    }
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

const initialStatusState = {
  isFetching: false,
  isCreating: false,
  isDeleting: false,
  error: false,
};

// TODO: refactor
const status = (state = initialStatusState, action) => {
  switch (action.type) {
    case FETCH_TACTICS_PENDING:
      return { ...state, isFetching: true };
    case FETCH_TACTICS_REJECTED:
      return { ...state, isFetching: false, error: true };
    case FETCH_TACTICS_FULFILLED:
      return { ...state, isFetching: false, error: false };

    case CREATE_TACTIC_PENDING:
      return { ...state, isCreating: true };
    case CREATE_TACTIC_REJECTED:
      return { ...state, isCreating: false, error: true };
    case CREATE_TACTIC_FULFILLED:
      return { ...state, isCreating: false, error: false };

    case DELETE_TACTIC_PENDING:
      return { ...state, isDeleting: true };
    case DELETE_TACTIC_REJECTED:
      return { ...state, isDeleting: false, error: true };
    case DELETE_TACTIC_FULFILLED:
      return { ...state, isDeleting: false, error: false };

    default:
      return state;
  }
};

export default combineReducers({ byId, items, status });
