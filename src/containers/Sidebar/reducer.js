import * as types from './constants';

const initialState = {
  isCreateTacticDialogOpen: false,
};

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: true };
    case types.CLOSE_CREATE_TACTIC_DIALOG:
      return { ...state, isCreateTacticDialogOpen: false };

    default:
      return state;
  }
};

export default sidebarReducer;
