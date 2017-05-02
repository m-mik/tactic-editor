import { normalize } from 'normalizr';
import * as types from '../constants/ActionTypes';
import * as mockApi from '../api';
import { tacticSchema } from '../constants/Schemas';

export const fetchTactics = () => (dispatch) => {
  dispatch({ type: types.FETCH_TACTICS_REQUEST });

  mockApi.fetchTactics().then((response) => {
    const normalizedData = normalize(response.data, { tactics: [tacticSchema] });
    const { entities, result } = normalizedData;

    dispatch({
      type: types.FETCH_TACTICS_SUCCESS,
      ids: result.tactics,
      entities,
    });
  }).catch((response) => {
    dispatch({
      type: types.FETCH_TACTICS_FAILURE,
      error: response.data.error,
    });
  });
};
