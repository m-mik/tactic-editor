import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

const byId = (state = {}, action) => {
  switch (action.type) {
    default: {
      if (get(action, 'payload.entities.players')) {
        return merge({}, state, action.payload.entities.players);
      }
      return state;
    }
  }
};

export default combineReducers({ byId });
