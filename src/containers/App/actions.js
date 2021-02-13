/* global DEVELOPMENT */
import history from '../../history';
import {
  GLOBAL_ERROR,
  SELECT_TACTIC,
  RECEIVE_ENTITY,
  OPEN_CREATE_TACTIC_DIALOG,
  CLOSE_CREATE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG,
} from './constants';

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

export const openCreateTacticDialog = () => ({ type: OPEN_CREATE_TACTIC_DIALOG });
export const closeCreateTacticDialog = () => ({ type: CLOSE_CREATE_TACTIC_DIALOG });
export const openDeleteTacticDialog = () => ({ type: OPEN_DELETE_TACTIC_DIALOG });
export const closeDeleteTacticDialog = () => ({ type: CLOSE_DELETE_TACTIC_DIALOG });
