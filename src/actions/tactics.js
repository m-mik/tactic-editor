import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import * as mockApi from '../api';
import { tacticSchema } from '../constants/Schemas';

const fetchTacticsRequest = () => ({
  type: types.FETCH_TACTICS_REQUEST,
});

const fetchTacticsSuccess = (entities, tactics) => ({
  type: types.FETCH_TACTICS_SUCCESS,
  response: { entities, tactics },
});

const fetchTacticsError = error => ({
  type: types.FETCH_TACTICS_FAILURE,
  response: { error },
});

export const fetchTactics = () => (dispatch) => {
  dispatch(fetchTacticsRequest());
  mockApi.fetchTactics().then((response) => {
    const normalizedData = normalize(response.data, { tactics: [tacticSchema] });
    const { entities, result: { tactics } } = normalizedData;
    dispatch(fetchTacticsSuccess(entities, tactics));
  }).catch((response) => {
    dispatch(fetchTacticsError(response.error));
  });
};

export const selectTactic = id => ({ type: types.SELECT_TACTIC, id });

export const openNewTacticDialog = () => ({ type: types.OPEN_NEW_TACTIC_DIALOG });
export const closeNewTacticDialog = () => ({ type: types.CLOSE_NEW_TACTIC_DIALOG });
