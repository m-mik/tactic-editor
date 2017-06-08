import { denormalize } from 'normalizr';
import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';
import tacticDetailSchema from './schema';

const getSelectedTacticId = state => state.app.selectedTacticId;
const getFetching = state => state.entities.tacticDetails.status.fetching;
const getErrors = state => state.entities.tacticDetails.status.errors;
const getTeams = state => state.entities.teams;
const getPlayers = state => state.entities.players;
const getTacticDetails = state => state.entities.tacticDetails;
const getPlayerTransitions = state => state.editor.playerTransitions;

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
  [getTacticDetails, getTeams, getPlayers, getSelectedTacticId, getPlayerTransitions],
  (tacticDetails, teams, players, selectedTacticId, playerTransitions) => {
    const entities = { tacticDetails, teams, players };
    if (!Object.keys(entities.teams.byId).length) return null;
    const denormalized = denormalize(
      selectedTacticId,
      tacticDetailSchema,
      { ...mapValues(entities, value => value.byId) },
    );

    if (denormalized) {
      const teamsWithPlayerTrans = denormalized.teams.map(team =>
        getTeamWithPlayerTrans(team, playerTransitions),
      );
      return {
        ...denormalized,
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
