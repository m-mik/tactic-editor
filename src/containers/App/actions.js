/* global DEVELOPMENT */
import history from '../../history';
import { GLOBAL_ERROR, SELECT_TACTIC, RECEIVE_ENTITY } from './constants';

export const handleError = (error) => {
  if (DEVELOPMENT) { console.warn(error); } // eslint-disable-line no-console

  return {
    type: GLOBAL_ERROR,
    error,
  };
};

export const selectTactic = id => (dispatch) => {
  if (!isNaN(id)) {
    history.push(`/tactics/${id}`);
    dispatch({ type: SELECT_TACTIC, id });
  }
};

export const receiveEntity = (data, schema) => ({
  type: RECEIVE_ENTITY,
  payload: { data },
  meta: {
    schema,
  },
});
