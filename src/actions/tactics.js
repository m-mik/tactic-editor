import { reset } from 'redux-form';
import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { tacticSchema, tacticDetailSchema } from '../constants/Schemas';
import { handleError } from './index';
import history from '../history';

export const openCreateTacticDialog = () => ({ type: types.OPEN_CREATE_TACTIC_DIALOG });
export const closeCreateTacticDialog = () => ({ type: types.CLOSE_CREATE_TACTIC_DIALOG });

export const selectTactic = (id, redirect = false) => {
  if (redirect) history.push(`/tactics/${id}`);
  return { type: types.SELECT_TACTIC, id };
};

const createTactic = data => dispatch =>
  dispatch({
    type: types.CREATE_TACTIC,
    payload: axios.post('/tactics', data),
    meta: { data },
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

const shouldFetchTactic = ({ entities }, id) => {
  const { tacticDetails } = entities;
  const { status, byId } = tacticDetails;
  const isFetching = status.fetching.indexOf(id) !== -1;
  const tacticDetail = byId[id];
  const tacticDetailExists = !!tacticDetail;
  return !tacticDetailExists && !isFetching;
};

export const fetchTacticIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchTactic(getState(), id)) {
    return dispatch(fetchTactic(id));
  }
  return Promise.resolve();
};

export const createAndSelectTactic = data => dispatch =>
  dispatch(createTactic(data)).then((response) => {
    const id = response.value.data.id;
    dispatch(selectTactic(id, true));
    dispatch(closeCreateTacticDialog());
    dispatch(reset('createTacticForm'));
  });

export const selectAndFetchTactic = id => (dispatch) => {
  dispatch(selectTactic(id));
  dispatch(fetchTacticIfNeeded(id));
};
