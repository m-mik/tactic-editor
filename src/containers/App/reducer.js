import {
  SELECT_TACTIC,
  OPEN_CREATE_TACTIC_DIALOG,
  CLOSE_CREATE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
} from './constants';

const initialState = {
  selectedTacticId: 0,
  isCreateTacticDialogOpen: false,
  isDeleteTacticDialogOpen: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
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

export default appReducer;
