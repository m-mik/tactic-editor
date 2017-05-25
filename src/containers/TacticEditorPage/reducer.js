import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import { ADD_PLAYER_TRANSITIONS, REMOVE_PLAYER_TRANSITIONS } from './constants';

const playerTransitions = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLAYER_TRANSITIONS:
      return { ...state, ...action.payload };
    case REMOVE_PLAYER_TRANSITIONS:
      return omit(state, action.payload);
    default:
      return state;
  }
};

export default combineReducers({ playerTransitions });
