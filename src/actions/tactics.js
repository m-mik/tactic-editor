import * as types from '../constants/ActionTypes';
import * as mockApi from '../api';
import { tacticSchema } from '../constants/Schemas';

export const fetchTactics = () => ({
  type: types.FETCH_TACTICS,
  payload: mockApi.fetchTactics(),
  meta: {
    schema: { tactics: [tacticSchema] },
  },
});

export const createTactic = data => ({
  type: types.CREATE_TACTIC,
  payload: mockApi.createTactic(data),
  meta: {
    schema: tacticSchema,
  },
});

export const selectTactic = id => ({ type: types.SELECT_TACTIC, id });
export const openNewTacticDialog = () => ({ type: types.OPEN_NEW_TACTIC_DIALOG });
export const closeNewTacticDialog = () => ({ type: types.CLOSE_NEW_TACTIC_DIALOG });
