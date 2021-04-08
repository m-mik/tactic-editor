import { ADD_SUBSTITUTION, REMOVE_SUBSTITUTION, UPDATE_TEAM } from './constants';
import teamSchema from './schema';
import { setPlayersToReplace } from '../../containers/TacticPage/actions';

export const updateTeam = (id, teamData) => ({
  type: UPDATE_TEAM,
  payload: {
    data: { id, ...teamData },
  },
  meta: {
    schema: teamSchema,
    data: { id },
  },
});

export const addSubstitution = (teamId, substitutionData) => (dispatch) => {
  dispatch(setPlayersToReplace(null));
  dispatch({
    type: ADD_SUBSTITUTION,
    payload: { teamId, substitutionData },
  });
};

export const removeSubstitution = (teamId, substitutionId) => ({
  type: REMOVE_SUBSTITUTION,
  payload: { teamId, substitutionId },
});
