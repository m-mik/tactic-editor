import { reset } from 'redux-form';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { tacticSchema } from '../constants/Schemas';
import { handleError } from './index';

export const selectTactic = id => ({ type: types.SELECT_TACTIC, id });
export const openNewTacticDialog = () => ({ type: types.OPEN_NEW_TACTIC_DIALOG });
export const closeNewTacticDialog = () => ({ type: types.CLOSE_NEW_TACTIC_DIALOG });

const createTactic = data => ({
  type: types.CREATE_TACTIC,
  payload: axios.post('/tactics', data),
  meta: { data },
});

export const fetchTactics = () => dispatch =>
  dispatch({
    type: types.FETCH_TACTICS,
    payload: axios.get('/tactics'),
    meta: {
      schema: [tacticSchema],
    },
  }).catch(error => dispatch(handleError(error)));

export const createAndSelectTactic = data => (dispatch) => {
  dispatch(createTactic(data)).then(response =>
      dispatch(selectTactic(response.value.data.id)),
  ).catch(error => dispatch(handleError(error)));

  dispatch(closeNewTacticDialog());
  dispatch(reset('newTacticForm'));
};
