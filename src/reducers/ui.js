import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  selectedTacticId: -1,
  newTacticDialogOpen: false,
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
    case types.OPEN_NEW_TACTIC_DIALOG:
      return { ...state, newTacticDialogOpen: true };
    case types.CLOSE_NEW_TACTIC_DIALOG:
      return { ...state, newTacticDialogOpen: false };
    default:
      return state;
  }
};

export default ui;
