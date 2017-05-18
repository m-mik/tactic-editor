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

const getPlayersByPosForTeam = denormalizedTeam =>
  denormalizedTeam.players.reduce((result, player) =>
    ({ ...result, [player.position]: player }), {});

const getTeamsWithPlayersByPos = denormalizedTeams =>
  denormalizedTeams.map(team =>
    ({ ...team, players: getPlayersByPosForTeam(team) }),
  );

export const tacticDetailSelector = createSelector(
  [getTacticDetails, getTeams, getPlayers, getSelectedTacticId],
  (tacticDetails, teams, players, selectedTacticId) => {
    const entities = { tacticDetails, teams, players };
    const denormalized = denormalize(
      selectedTacticId,
      tacticDetailSchema,
      { ...mapValues(entities, value => value.byId) },
    );

    return denormalized ? {
      ...denormalized,
      teams: getTeamsWithPlayersByPos(denormalized.teams),
    } : null;
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
