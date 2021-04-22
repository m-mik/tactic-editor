import omit from 'lodash/omit';
import {
  ADD_PLAYER_TRANSITIONS,
  CLOSE_CREATE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
  CLOSE_EDIT_TEAM_DIALOG,
  OPEN_CREATE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG,
  OPEN_EDIT_TEAM_DIALOG,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
  SELECT_TACTIC,
  SET_PLAYERS_TO_REPLACE,
} from './constants';

const initialState = {
  activeTacticId: 0,
  activePlayerId: 0,
  playersToReplace: null,
  editedTeamId: 0,
  playerTransitions: {},
  isCreateTacticDialogOpen: false,
  isDeleteTacticDialogOpen: false,
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
    case SELECT_TACTIC:
      return { ...state, activeTacticId: action.id };
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
    case OPEN_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: true };
    case CLOSE_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: false };
    case OPEN_DELETE_TACTIC_DIALOG:
      return { ...state, isDeleteTacticDialogOpen: true };
    case CLOSE_DELETE_TACTIC_DIALOG:
      return { ...state, isDeleteTacticDialogOpen: false };
    default:
      return state;
  }
};

export default editor;
