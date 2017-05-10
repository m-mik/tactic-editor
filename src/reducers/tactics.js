import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const tactic = (state, action) => {
  switch (action.type) {
    case types.CREATE_TACTIC_FULFILLED: {
      const id = action.payload.data.id;
      return { [id]: { id, ...action.meta.data, ...state } };
    }
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_TACTIC_FULFILLED:
      return { ...state, ...tactic(undefined, action) };
    default:
      return state;
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_TACTIC_FULFILLED:
      return [action.payload.data.id, ...state];
    case types.FETCH_TACTICS_FULFILLED:
      return [...state, ...action.payload.result];
    default:
      return state;
  }
};

const status = (state = { isFetching: false, error: false }, action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_PENDING:
      return { ...state, isFetching: true };
    case types.FETCH_TACTICS_REJECTED:
      return { ...state, isFetching: false, error: true };
    case types.FETCH_TACTICS_FULFILLED:
      return { ...state, isFetching: false, error: false };
    default:
      return state;
  }
};

export default combineReducers({ byId, items, status });
