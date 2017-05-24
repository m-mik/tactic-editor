import omit from 'lodash/omit';
import { combineReducers } from 'redux';
import { ADD_PLAYER_TRANSITION, REMOVE_PLAYER_TRANSITION } from './constants';

const playerTransitions = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLAYER_TRANSITION:
      return { ...state, [action.payload.playerId]: action.payload.offset };
    case REMOVE_PLAYER_TRANSITION:
      return omit(state, action.payload);
    default:
      return state;
  }
};

export default combineReducers({ playerTransitions });
