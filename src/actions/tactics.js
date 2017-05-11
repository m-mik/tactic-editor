import { reset } from 'redux-form';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { tacticSchema, tacticDetailSchema } from '../constants/Schemas';
import { isFetchingSelector } from '../selectors';
import { handleError } from './index';

const shouldFetchTactic = (state, id) => {
  const { entities } = state;
  const { tacticDetails } = entities;
  const isFetching = isFetchingSelector(state);
  const tacticDetailExists = !!tacticDetails.byId[id];
  return !tacticDetailExists && !isFetching;
};

export const openCreateTacticDialog = () => ({ type: types.OPEN_CREATE_TACTIC_DIALOG });
export const closeCreateTacticDialog = () => ({ type: types.CLOSE_CREATE_TACTIC_DIALOG });
export const redirectTo = path => ({ type: types.REDIRECT, payload: path });
export const resetRedirect = () => ({ type: types.REDIRECT_RESET });

export const selectTactic = id => (dispatch) => {
  if (!isNaN(id)) dispatch(redirectTo(`/tactics/${id}`));
  dispatch({ type: types.SELECT_TACTIC, id });
};

export const createTactic = data => dispatch =>
  dispatch({
    type: types.CREATE_TACTIC,
    payload: axios.post('/tactics', data),
    meta: { data },
  }).then(({ action }) => {
    const id = action.payload.data.id;
    dispatch(selectTactic(id));
    dispatch(closeCreateTacticDialog());
    dispatch(reset('createTacticForm'));
  }).catch(error => dispatch(handleError(error)));

export const fetchTactic = id => dispatch =>
  dispatch({
    type: types.FETCH_TACTIC,
    payload: axios.get(`/tactics/${id}`),
    meta: {
      schema: tacticDetailSchema,
      data: { id },
    },
  }).catch(error => dispatch(handleError(error)));

export const fetchTactics = () => dispatch =>
  dispatch({
    type: types.FETCH_TACTICS,
    payload: axios.get('/tactics'),
    meta: {
      schema: [tacticSchema],
    },
  }).catch(error => dispatch(handleError(error)));

export const fetchTacticIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchTactic(getState(), id)) {
    return dispatch(fetchTactic(id));
  }
  return Promise.resolve();
};
