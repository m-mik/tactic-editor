import axios from 'axios';
import { FETCH_TACTIC } from './constants';
import tacticDetailSchema from '../tacticDetails/schema';
import { isFetchingSelector } from '../../entities/tacticDetails/selectors';
import { handleError } from '../../containers/App/actions';

const shouldFetchTactic = (state, id) => {
  const { entities } = state;
  const { tacticDetails } = entities;
  const isFetching = isFetchingSelector(state);
  const tacticDetailExists = !!tacticDetails.byId[id];
  return !tacticDetailExists && !isFetching;
};

export const fetchTactic = id => dispatch =>
  dispatch({
    type: FETCH_TACTIC,
    payload: axios.get(`/tactics/${id}`),
    meta: {
      schema: tacticDetailSchema,
      data: { id },
    },
  }).catch(error => dispatch(handleError(error)));

export const fetchTacticIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchTactic(getState(), id)) {
    return dispatch(fetchTactic(id));
  }
  return Promise.resolve();
};
