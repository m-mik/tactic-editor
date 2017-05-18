import * as types from './constants';
import { SELECT_TACTIC } from '../../entities/tactics/constants';

const initialState = {
  selectedTacticId: 0,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TACTIC:
      return { ...state, selectedTacticId: action.id };
    default:
      return state;
  }
};

export default appReducer;
