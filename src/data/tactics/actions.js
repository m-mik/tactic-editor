import { reset } from 'redux-form';
import axios from 'axios';
import {
  CREATE_TACTIC,
  DELETE_TACTIC,
  FETCH_TACTICS,
  SAVE_TACTIC,
  UPDATE_TACTIC,
} from './constants';
import tacticSchema from './schema';
import teamSchema from '../teams/schema';
import {
  closeCreateTacticDialog,
  closeDeleteTacticDialog,
  handleError,
  receiveEntity,
  selectTactic,
} from '../../containers/App/actions';
import { updateFormation } from '../../pages/TacticPage/actions';
import { updateTacticDetail } from '../tacticDetails/actions';
import { selectTactics } from './selectors';
import history from '../../history';
import formations from '../../lib/footballField/formations.json';

export const saveTactic = tactic => (dispatch) => {
  dispatch({
    type: SAVE_TACTIC,
    payload: axios.put(`/tactics/${tactic.id}`, tactic),
    meta: { id: tactic.id },
  }).catch(error => dispatch(handleError(error)));
};

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

export const deleteTactic = id => (dispatch, getState) => {
  dispatch({
    type: DELETE_TACTIC,
    payload: axios.delete(`/tactics/${id}`),
    meta: { id },
  }).then(() => {
    dispatch(closeDeleteTacticDialog());
    const tactics = selectTactics(getState());
    const firstTacticId = tactics[0] ? tactics[0].id : null;
    if (firstTacticId) {
      dispatch(selectTactic(firstTacticId));
    } else {
      history.push('/tactics');
    }
  }).catch(error => dispatch(handleError(error)));
};
