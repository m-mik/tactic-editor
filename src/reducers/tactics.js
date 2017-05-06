import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const items = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_FULFILLED:
      return [...state, ...action.payload.tactics];
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
