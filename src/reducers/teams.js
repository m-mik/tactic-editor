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
    default:
      return state;
  }
};

const status = (state = { isFetching: false, error: false }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ byId, items, status });
