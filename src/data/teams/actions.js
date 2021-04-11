import { ADD_SUBSTITUTION, REMOVE_SUBSTITUTION, UPDATE_TEAM } from './constants';
import teamSchema from './schema';
import { setPlayersToReplace } from '../../containers/TacticPage/actions';
import { updatePlayer } from '../players/actions';
import { TILES_COUNT } from '../../lib/footballField';

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

export const addBenchPlayer = teamId => (dispatch, getState) => {
  const { players, teams } = getState().data;
  const team = teams.byId[teamId];
  const teamPlayers = team.players.map(playerId => players.byId[playerId]);
  const playerToUpdate = teamPlayers.find(player => player.position === -1);
  const playerPositions = teamPlayers.map(player => player.position);
  const maxPos = Math.max(TILES_COUNT - 1, ...playerPositions);
  if (!playerToUpdate) return;
  dispatch(updatePlayer(playerToUpdate.id, {
    position: maxPos + 1,
  }));
};
