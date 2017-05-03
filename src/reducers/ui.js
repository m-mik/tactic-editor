import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  selectedTacticId: -1,
};

const ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
    default:
      return state;
  }
};

export default ui;
