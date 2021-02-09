import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

const byId = (state = {}, action) => {
  switch (action.type) {
    default: {
      if (get(action, 'payload.entities.teams')) {
        return merge({}, state, action.payload.entities.teams);
      }
      return state;
    }
  }
};

export default combineReducers({ byId });
