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
  handleError,
  receiveEntity,
} from '../../containers/App/actions';
import {
  closeCreateTacticDialog,
  closeDeleteTacticDialog, removeUnsavedTactic, selectTactic,
  updateFormation,
} from '../../pages/TacticPage/actions';
import { updateTacticDetail } from '../tacticDetails/actions';
import { selectTactics } from './selectors';
import history from '../../history';
import {
  changeTeamPlayersPos, getFormationArray,
  INITIAL_FIELD_PLAYER_POS,
  isFieldPlayer,
} from '../../lib/footballField';

export const saveTactic = tactic => dispatch => dispatch({
  type: SAVE_TACTIC,
  payload: axios.put(`/tactics/${tactic.id}`, tactic),
  meta: { id: tactic.id },
}).then(({ action }) => dispatch(removeUnsavedTactic(action.meta.id)))
  .catch(error => dispatch(handleError(error)));

export const createTactic = ({ data, clone = false }) => dispatch => dispatch({
  type: CREATE_TACTIC,
  payload: axios.post(`/tactics${clone ? '?clone=true' : ''}`, data),
  meta: { data },
}).then(({ action }) => {
  const { id, teams } = action.payload.data;
  const formations = teams.map(team => ({ positions: getFormationArray(team.players) }));
  const teamsWithInitPos = teams.map(
    team => changeTeamPlayersPos(team, INITIAL_FIELD_PLAYER_POS, isFieldPlayer),
  );
  dispatch(receiveEntity(teamsWithInitPos, [teamSchema]));
  dispatch(selectTactic(id));
  dispatch(closeCreateTacticDialog());
  dispatch(reset('createTacticForm'));
  teamsWithInitPos.forEach((team, index) => dispatch(updateFormation(team, formations[index])));
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
    const latestTacticId = Math.max(0, ...tactics.items);
    if (latestTacticId) {
      dispatch(selectTactic(latestTacticId));
    } else {
      history.push('/tactics');
    }
  }).catch(error => dispatch(handleError(error)));
};

export const cloneTactic = tactic => dispatch =>
  dispatch(saveTactic(tactic))
    .then(() => dispatch(createTactic({
      data: { id: tactic.id },
      clone: true,
    })));
