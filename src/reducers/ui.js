import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  selectedTacticId: 0,
  isCreateTacticDialogOpen: false,
  isCreateTacticPending: false,
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
    case types.OPEN_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: true };
    case types.CLOSE_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: false };
    case types.CREATE_TACTIC_PENDING:
      return { ...state, isCreateTacticPending: true };
    case types.CREATE_TACTIC_FULFILLED:
    case types.CREATE_TACTIC_REJECTED:
      return { ...state, isCreateTacticPending: false };
    default:
      return state;
  }
};

export default ui;
