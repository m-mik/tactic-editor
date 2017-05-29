import omit from 'lodash/omit';
import {
  ADD_PLAYER_TRANSITIONS,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
} from './constants';

const initialState = {
  selectedPlayerId: 0,
  playerTransitions: {},
};

const playerTransitions = (state = initialState.playerTransitions, action) => {
  switch (action.type) {
    case ADD_PLAYER_TRANSITIONS:
      return { ...state, ...action.payload };
    case REMOVE_PLAYER_TRANSITIONS:
      return omit(state, action.payload);
    default:
      return state;
  }
};

const editor = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYER_TRANSITIONS:
    case REMOVE_PLAYER_TRANSITIONS:
      return {
        ...state,
        playerTransitions: playerTransitions(state.playerTransitions, action),
      };
    case SELECT_PLAYER:
      return { ...state, selectedPlayerId: action.payload };
    default:
      return state;
  }
};

export default editor;
