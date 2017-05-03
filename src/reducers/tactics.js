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
    case types.FETCH_TACTICS_SUCCESS:
      return [...state, ...action.response.tactics];
    default:
      return state;
  }
};

const status = (state = { isFetching: false, error: '' }, action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_TACTICS_FAILURE:
      return { ...state, isFetching: false, error: action.response.error };
    case types.FETCH_TACTICS_SUCCESS:
      return { ...state, isFetching: false, error: '' };
    default:
      return state;
  }
};

export default combineReducers({ byId, items, status });
