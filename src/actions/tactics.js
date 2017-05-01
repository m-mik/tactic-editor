import types from '../constants/ActionTypes';
import * as mockApi from '../api';

export const requestTactics = () => {
};

export const fetchTactics = () => (dispatch) => {
  dispatch(requestTactics);
  mockApi.fetchTactics().then(tactics => console.log(tactics));
};
