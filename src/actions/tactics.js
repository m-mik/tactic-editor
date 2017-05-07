import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { tacticSchema } from '../constants/Schemas';

export const selectTactic = id => ({ type: types.SELECT_TACTIC, id });
export const openNewTacticDialog = () => ({ type: types.OPEN_NEW_TACTIC_DIALOG });
export const closeNewTacticDialog = () => ({ type: types.CLOSE_NEW_TACTIC_DIALOG });

export const fetchTactics = () => ({
  type: types.FETCH_TACTICS,
  payload: axios.get('/tactics'),
  meta: {
    schema: { tactics: [tacticSchema] },
  },
});

export const createTactic = data => ({
  type: types.CREATE_TACTIC,
  payload: axios.post('/tactics', data),
  meta: { data },
});
