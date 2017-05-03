import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import * as mockApi from '../api';
import { tacticSchema } from '../constants/Schemas';

const fetchTacticsRequest = () => ({
  type: types.FETCH_TACTICS_REQUEST,
});

const fetchTacticsSuccess = (ids, entities) => ({
  type: types.FETCH_TACTICS_SUCCESS,
  ids,
  entities,
});

const fetchTacticsError = error => ({
  type: types.FETCH_TACTICS_FAILURE,
  error,
});

export const fetchTactics = () => (dispatch) => {
  dispatch(fetchTacticsRequest);
  mockApi.fetchTactics().then((response) => {
    const normalizedData = normalize(response.data, { tactics: [tacticSchema] });
    const { entities, result } = normalizedData;
    dispatch(fetchTacticsSuccess(result.tactics, entities));
  }).catch((response) => {
    dispatch(fetchTacticsError(response.error));
  });
};
