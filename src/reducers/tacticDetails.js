import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const fetching = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TACTIC_PENDING:
      return [...state, action.meta.data.id];
    case types.FETCH_TACTIC_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case types.FETCH_TACTIC_REJECTED:
      return state.filter(id => id !== action.meta.data.id);
    default:
      return state;
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_TACTIC_FULFILLED:
      return [];
    case types.FETCH_TACTIC_PENDING:
      return state.filter(id => id !== action.meta.data.id);
    case types.FETCH_TACTIC_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case types.FETCH_TACTIC_REJECTED:
      return [...state, action.meta.data.id];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_TACTIC_FULFILLED: {
      const id = action.payload.data.id;
      return { ...state, [id]: { id, teams: [] } };
    }
    default:
      return state;
  }
};

const status = (state = { fetching: [], errors: [] }, action) => ({
  ...state,
  fetching: fetching(state.fetching, action),
  errors: errors(state.errors, action),
});

export default combineReducers({ byId, status });
