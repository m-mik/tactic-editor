import omit from 'lodash/omit';
import {
  ADD_PLAYER_TRANSITIONS,
  ADD_UNSAVED_TACTIC,
  CLOSE_CREATE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
  CLOSE_EDIT_TEAM_DIALOG,
  OPEN_CREATE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG,
  OPEN_EDIT_TEAM_DIALOG,
  REMOVE_PLAYER_TRANSITIONS,
  REMOVE_UNSAVED_TACTIC,
  SELECT_PLAYER,
  SELECT_TACTIC,
  SET_PLAYERS_TO_REPLACE,
} from './constants';
import {
  SAVE_TACTIC_FULFILLED,
  SAVE_TACTIC_PENDING,
  SAVE_TACTIC_REJECTED,
} from '../../data/tactics/constants';

const initialState = {
  activeTacticId: 0,
  activePlayerId: 0,
  editedTeamId: 0,
  unsavedTacticIds: new Set(),
  playersToReplace: null,
  playerTransitions: {},
  isCreateTacticDialogOpen: false,
  isDeleteTacticDialogOpen: false,
  isSavingTactic: false,
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
    case ADD_UNSAVED_TACTIC: {
      return {
        ...state,
        unsavedTacticIds: new Set([...state.unsavedTacticIds, action.payload]),
      };
    }
    case REMOVE_UNSAVED_TACTIC: {
      return {
        ...state,
        unsavedTacticIds: new Set(
          Array.from(state.unsavedTacticIds).filter(id => id !== action.payload),
        ),
      };
    }
    case SAVE_TACTIC_PENDING:
      return { ...state, isSavingTactic: true };
    case SAVE_TACTIC_FULFILLED:
    case SAVE_TACTIC_REJECTED:
      return { ...state, isSavingTactic: false };
    default:
      return state;
  }
};

export default editor;
