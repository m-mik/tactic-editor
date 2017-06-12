import { combineReducers } from 'redux';
import {
  FETCH_TACTIC_PENDING,
  FETCH_TACTIC_FULFILLED,
  FETCH_TACTIC_REJECTED,
} from './constants';
import { CREATE_TACTIC_FULFILLED } from '../tactics/constants';

const fetching = (state = [], action) => {
  switch (action.type) {
    case FETCH_TACTIC_PENDING:
      return [...state, action.meta.data.id];
    case FETCH_TACTIC_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case FETCH_TACTIC_REJECTED:
      return state.filter(id => id !== action.meta.data.id);
    default:
      return state;
  }
};

const errors = (state = [], action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED:
      return [];
    case FETCH_TACTIC_PENDING:
      return state.filter(id => id !== action.meta.data.id);
    case FETCH_TACTIC_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case FETCH_TACTIC_REJECTED:
      return [...state, action.meta.data.id];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED: {
      const { teams, id, options } = action.payload.data;
      return { ...state, [id]: { id, options, teams: teams.map(team => team.id) } };
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
