import { combineReducers } from 'redux';

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

export default combineReducers({ byId, items });
