import * as types from '../constants/ActionTypes';
import * as mockApi from '../api';

export const fetchTactics = () => (dispatch) => {
  dispatch({ type: types.FETCH_TACTICS_REQUEST });

  mockApi.fetchTactics().then((response) => {
    dispatch({
      type: types.FETCH_TACTICS_SUCCESS,
      tactics: response.data.tactics,
    });
  }).catch((response) => {
    dispatch({
      type: types.FETCH_TACTICS_FAILURE,
      error: response.data.error,
    });
  });
};
