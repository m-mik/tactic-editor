import axios from 'axios';
import { FETCH_TACTIC_DETAIL, UPDATE_TACTIC_DETAIL } from './constants';
import tacticDetailSchema from '../tacticDetails/schema';
import { isFetchingSelector } from '../../data/tacticDetails/selectors';
import { handleError } from '../../containers/App/actions';

const shouldFetchTacticDetail = (state, id) => {
  const { data } = state;
  const { tacticDetails } = data;
  const isFetching = isFetchingSelector(state);
  const tacticDetailExists = !!tacticDetails.byId[id];
  return !tacticDetailExists && !isFetching;
};

export const fetchTacticDetail = id => dispatch =>
  dispatch({
    type: FETCH_TACTIC_DETAIL,
    payload: axios.get(`/tactics/${id}`),
    meta: {
      schema: tacticDetailSchema,
      data: { id },
    },
  }).catch(error => dispatch(handleError(error)));

export const fetchTacticIfNeeded = id => (dispatch, getState) => {
  if (shouldFetchTacticDetail(getState(), id)) {
    return dispatch(fetchTacticDetail(id));
  }
  return Promise.resolve();
};

export const updateTacticDetail = (id, tacticDetailData) => ({
  type: UPDATE_TACTIC_DETAIL,
  payload: {
    data: { id, ...tacticDetailData },
  },
  meta: {
    schema: tacticDetailSchema,
    data: { id },
  },
});
