import {
  ADD_TEAM_STAT,
  REMOVE_TEAM_STAT,
  UPDATE_TEAM, UPDATE_TEAM_STAT,
} from './constants';
import teamSchema from './schema';
import { selectPlayer, setPlayersToReplace } from '../../containers/TacticPage/actions';
import { updatePlayer } from '../players/actions';
import { findFirstAvailableBenchPos, isOnBench, TILES_COUNT } from '../../lib/footballField';

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

export const addTeamStat = ({ teamId, statName, statData }) => ({
  type: ADD_TEAM_STAT,
  payload: { teamId, statData, statName },
});

export const removeTeamStat = ({ teamId, statName, statId }) => ({
  type: REMOVE_TEAM_STAT,
  payload: { teamId, statName, statId },
});

export const updateTeamStat = ({ teamId, statName, statId, statData }) => ({
  type: UPDATE_TEAM_STAT,
  payload: { teamId, statName, statId, statData },
});

export const addSubstitution = (teamId, substitutionData) => (dispatch) => {
  dispatch(setPlayersToReplace(null));
  dispatch(addTeamStat({ teamId, statName: 'substitutions', statData: substitutionData }));
};

export const removeSubstitution = (teamId, statId) => (dispatch) => {
  dispatch(removeTeamStat({ teamId, statName: 'substitutions', statId }));
};

export const addBenchPlayer = teamId => (dispatch, getState) => {
  const { players, teams } = getState().data;
  const team = teams.byId[teamId];
  const teamPlayers = team.players.map(playerId => players.byId[playerId]);
  const playerToUpdate = teamPlayers.find(player => player.position === -1);
  const playerPositions = teamPlayers.map(player => player.position);
  const benchPositions = playerPositions.filter(isOnBench);
  const position = findFirstAvailableBenchPos(benchPositions);
  if (!playerToUpdate) return;
  dispatch(updatePlayer(playerToUpdate.id, { position }));
};

export const removeBenchPlayer = playerId => (dispatch) => {
  dispatch(selectPlayer(0));
  dispatch(updatePlayer(playerId, { position: -1 }));
};
