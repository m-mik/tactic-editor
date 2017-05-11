import { denormalize } from 'normalizr';
import includes from 'lodash/includes';
import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';
import { tacticDetailSchema } from '../constants/Schemas';

const getTactics = state => state.entities.tactics;
const getSelectedTacticId = state => state.ui.selectedTacticId;
const getFetching = state => state.entities.tacticDetails.status.fetching;
const getErrors = state => state.entities.tacticDetails.status.errors;
const getTeams = state => state.entities.teams;
const getPlayers = state => state.entities.players;
const getTacticDetails = state => state.entities.tacticDetails;

export const tacticsSelector = createSelector(
  [getTactics], tactics => tactics.items.map(id => tactics.byId[id]),
);

export const tacticDetailSelector = createSelector(
  [getTacticDetails, getTeams, getPlayers, getSelectedTacticId],
  (tacticDetails, teams, players, selectedTacticId) => {
    const entities = { tacticDetails, teams, players };
    return denormalize(
      selectedTacticId,
      tacticDetailSchema,
      { ...mapValues(entities, value => value.byId) },
    );
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
