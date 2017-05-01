import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const byId = (state = { isFetching: false }, action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_TACTICS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

const allIds = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ byId, allIds });
