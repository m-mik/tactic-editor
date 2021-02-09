import { denormalize } from 'normalizr';
import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';
import tacticDetailSchema from './schema';

const getSelectedTacticId = state => state.app.selectedTacticId;
const getFetching = state => state.data.tacticDetails.status.fetching;
const getErrors = state => state.data.tacticDetails.status.errors;
const getTeams = state => state.data.teams;
const getPlayers = state => state.data.players;
const getTacticDetails = state => state.data.tacticDetails;
const getPlayerTransitions = state => state.editor.playerTransitions;
const getTactics = state => state.data.tactics;

const getTeamWithPlayerTrans = (denormalizedTeam, playerTransitions) => {
  const playersWithTrans = denormalizedTeam.players.map(player =>
    ({ ...player, transition: playerTransitions[player.id] }),
  );
  return { ...denormalizedTeam, players: playersWithTrans };
};

const getPlayersByPosForTeam = denormalizedTeam =>
  denormalizedTeam.players.reduce((result, player) =>
    ({ ...result, [player.position]: player }), {});

const getTeamsWithPlayersByPos = denormalizedTeams =>
  denormalizedTeams.map(team =>
    ({ ...team, players: getPlayersByPosForTeam(team) }),
  );

export const tacticDetailSelector = createSelector(
  [getTacticDetails, getTactics, getTeams, getPlayers, getSelectedTacticId, getPlayerTransitions],
  (tacticDetails, tactics, teams, players, selectedTacticId, playerTransitions) => {
    const data = { tacticDetails, teams, players };
    if (!Object.keys(data.teams.byId).length) return null;
    const denormalized = denormalize(
      selectedTacticId,
      tacticDetailSchema,
      { ...mapValues(data, value => value.byId) },
    );

    if (denormalized) {
      const teamsWithPlayerTrans = denormalized.teams.map(team =>
        getTeamWithPlayerTrans(team, playerTransitions),
      );
      return {
        ...denormalized,
        name: tactics.byId[selectedTacticId].name,
        teams: getTeamsWithPlayersByPos(teamsWithPlayerTrans),
      };
    }
    return null;
  },
);

export const isFetchingSelector = createSelector(
  [getFetching, getSelectedTacticId],
  (fetching, selectedTacticId) => includes(fetching, selectedTacticId),
);

export const hasErrorSelector = createSelector(
  [getErrors, getSelectedTacticId],
  (errors, selectedTacticId) => includes(errors, selectedTacticId),
);
