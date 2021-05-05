import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

import {
  FETCH_TACTIC_DETAIL_PENDING,
  FETCH_TACTIC_DETAIL_FULFILLED,
  FETCH_TACTIC_DETAIL_REJECTED,
} from './constants';
import { CREATE_TACTIC_FULFILLED } from '../tactics/constants';

export const fetching = (state = [], action) => {
  switch (action.type) {
    case FETCH_TACTIC_DETAIL_PENDING:
      return [...state, action.meta.data.id];
    case FETCH_TACTIC_DETAIL_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case FETCH_TACTIC_DETAIL_REJECTED:
      return state.filter(id => id !== action.meta.data.id);
    default:
      return state;
  }
};

export const errors = (state = [], action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED:
      return [];
    case FETCH_TACTIC_DETAIL_PENDING:
      return state.filter(id => id !== action.meta.data.id);
    case FETCH_TACTIC_DETAIL_FULFILLED:
      return state.filter(id => id !== action.payload.result);
    case FETCH_TACTIC_DETAIL_REJECTED:
      return [...state, action.meta.data.id];
    default:
      return state;
  }
};

export const byId = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED: {
      const { teams, id, options } = action.payload.data;
      return { ...state, [id]: { id, options, teams: teams.map(team => team.id) } };
    }
    default: {
      if (get(action, 'payload.entities.tacticDetails')) {
        return merge({}, state, action.payload.entities.tacticDetails);
      }
      return state;
    }
  }
};

export const status = (state = { fetching: [], errors: [] }, action) => {
  switch (action.type) {
    case CREATE_TACTIC_FULFILLED:
    case FETCH_TACTIC_DETAIL_PENDING:
    case FETCH_TACTIC_DETAIL_FULFILLED:
    case FETCH_TACTIC_DETAIL_REJECTED:
      return {
        ...state,
        fetching: fetching(state.fetching, action),
        errors: errors(state.errors, action),
      };
    default:
      return state;
  }
};

export default combineReducers({ byId, status });
