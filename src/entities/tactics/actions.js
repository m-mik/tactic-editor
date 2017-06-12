import { reset } from 'redux-form';
import axios from 'axios';
import { CREATE_TACTIC, UPDATE_TACTIC, FETCH_TACTICS } from './constants';
import tacticSchema from './schema';
import teamSchema from '../teams/schema';
import { receiveEntity, selectTactic, handleError } from '../../containers/App/actions';
import { closeCreateTacticDialog } from '../../containers/Sidebar/actions';
import { updateFormation } from '../../containers/TacticEditorPage/actions';
import { updateTacticDetail } from '../tacticDetails/actions';
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

export const updateTactic = (id, data) => (dispatch) => {
  const { name, ...tacticDetailData } = data;
  const tacticData = { name };
  if (name) {
    dispatch({
      type: UPDATE_TACTIC,
      payload: {
        data: { id, ...tacticData },
      },
      meta: {
        schema: tacticSchema,
        data: { id },
      },
    });
  }
  if (Object.keys(tacticDetailData).length) {
    dispatch(updateTacticDetail(id, tacticDetailData));
  }
};
