/* global DEVELOPMENT */
import history from '../../history';
import { GLOBAL_ERROR, SELECT_TACTIC } from './constants';

export const handleError = (error) => {
  if (DEVELOPMENT) { console.warn(error); } // eslint-disable-line no-console

  return {
    type: GLOBAL_ERROR,
    error,
  };
};

export const selectTactic = id => (dispatch) => {
  if (!isNaN(id)) history.push(`/tactics/${id}`);
  dispatch({ type: SELECT_TACTIC, id });
};
