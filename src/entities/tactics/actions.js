import { reset } from 'redux-form';
import axios from 'axios';
import * as types from './constants';
import tacticSchema from './schema';
import { handleError } from '../../containers/App/actions';
import { closeCreateTacticDialog } from '../../containers/Sidebar/actions';
import history from '../../history';

export const selectTactic = id => (dispatch) => {
  if (!isNaN(id)) history.push(`/tactics/${id}`);
  dispatch({ type: types.SELECT_TACTIC, id });
};

export const createTactic = data => dispatch =>
  dispatch({
    type: types.CREATE_TACTIC,
    payload: axios.post('/tactics', data),
    meta: { data },
  }).then(({ action }) => {
    const id = action.payload.data.id;
    dispatch(selectTactic(id));
    dispatch(closeCreateTacticDialog());
    dispatch(reset('createTacticForm'));
  }).catch(error => dispatch(handleError(error)));

export const fetchTactics = () => dispatch =>
  dispatch({
    type: types.FETCH_TACTICS,
    payload: axios.get('/tactics'),
    meta: {
      schema: [tacticSchema],
    },
  }).catch(error => dispatch(handleError(error)));

