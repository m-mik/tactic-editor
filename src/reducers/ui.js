import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  selectedTacticId: -1,
  createTacticDialogOpen: false,
  createTacticPending: false,
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
    case types.OPEN_CREATE_TACTIC_DIALOG:
      return { ...state, createTacticDialogOpen: true };
    case types.CLOSE_CREATE_TACTIC_DIALOG:
      return { ...state, createTacticDialogOpen: false };
    case types.CREATE_TACTIC_PENDING:
      return { ...state, createTacticPending: true };
    case types.CREATE_TACTIC_FULFILLED:
    case types.CREATE_TACTIC_REJECTED:
      return { ...state, createTacticPending: false };
    default:
      return state;
  }
};

export default ui;
