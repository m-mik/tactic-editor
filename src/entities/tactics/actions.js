import { reset } from 'redux-form';
import axios from 'axios';
import { CREATE_TACTIC, FETCH_TACTICS } from './constants';
import tacticSchema from './schema';
import { selectTactic, handleError } from '../../containers/App/actions';
import { closeCreateTacticDialog } from '../../containers/Sidebar/actions';

export const createTactic = data => dispatch =>
  dispatch({
    type: CREATE_TACTIC,
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
    type: FETCH_TACTICS,
    payload: axios.get('/tactics'),
    meta: {
      schema: [tacticSchema],
    },
  }).catch(error => dispatch(handleError(error)));

