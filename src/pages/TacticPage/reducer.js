import omit from 'lodash/omit';
import {
  ADD_PLAYER_TRANSITIONS,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
  OPEN_EDIT_TEAM_DIALOG,
  CLOSE_EDIT_TEAM_DIALOG,
  SET_PLAYERS_TO_REPLACE,
} from './constants';

const initialState = {
  activePlayerId: 0,
  playersToReplace: null,
  editedTeamId: 0,
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
      return { ...state, activePlayerId: action.payload };
    case SET_PLAYERS_TO_REPLACE:
      return { ...state, playersToReplace: action.payload };
    case OPEN_EDIT_TEAM_DIALOG:
      return { ...state, editedTeamId: action.payload };
    case CLOSE_EDIT_TEAM_DIALOG:
      return { ...state, editedTeamId: initialState.editedTeamId };
    default:
      return state;
  }
};

export default editor;
