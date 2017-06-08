import { reset } from 'redux-form';
import axios from 'axios';
import { CREATE_TACTIC, FETCH_TACTICS } from './constants';
import tacticSchema from './schema';
import teamSchema from '../teams/schema';
import { receiveEntity, selectTactic, handleError } from '../../containers/App/actions';
import { closeCreateTacticDialog } from '../../containers/Sidebar/actions';
import { updateFormation } from '../../containers/TacticEditorPage/actions';
import formations from '../../lib/footballField/formations.json';

export const createTactic = data => dispatch =>
  dispatch({
    type: CREATE_TACTIC,
    payload: axios.post('/tactics', data),
    meta: { data },
  }).then(({ action }) => {
    const { id, teams } = action.payload.data;
    dispatch(receiveEntity(teams, [teamSchema]));
    dispatch(selectTactic(id));
    dispatch(closeCreateTacticDialog());
    dispatch(reset('createTacticForm'));
    teams.forEach(team => dispatch(updateFormation(team, formations[1])));
  }).catch(error => dispatch(handleError(error)));

export const fetchTactics = () => dispatch =>
  dispatch({
    type: FETCH_TACTICS,
    payload: axios.get('/tactics'),
    meta: {
      schema: [tacticSchema],
    },
  }).catch(error => dispatch(handleError(error)));
