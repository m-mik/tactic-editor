import { createSelector } from 'reselect';

const getTactics = state => state.entities.tactics;
const getSelectedTacticId = state => state.ui.selectedTacticId;
const getFetching = state => state.entities.tacticDetails.status.fetching;
const getErrors = state => state.entities.tacticDetails.status.errors;

export const tacticsSelector = createSelector(
  [getTactics], tactics => tactics.items.map(id => tactics.byId[id]),
);

/*
 import { denormalize } from 'normalizr';
 import { tacticSchema } from '../constants/Schemas';

 const getTeams = state => state.entities.teams;
const getTacticDetails = state => state.entities.tacticDetails;

export const tacticsDetailsSelector = createSelector(
  [getTactics, getTeams],
  (tactics, teams) => denormalize(
    tactics.items, [tacticSchema],
    { tactics: tactics.byId, teams: teams.byId },
  ),
);
*/

export const isFetchingSelector = createSelector(
  [getFetching, getSelectedTacticId],
  (fetching, selectedTacticId) => {
    console.log('fetching selector: ', selectedTacticId, fetching.indexOf(selectedTacticId) !== -1);
    return fetching.indexOf(selectedTacticId) !== -1;
  },
);

export const hasErrorSelector = createSelector(
  [getErrors, getSelectedTacticId],
  (errors, selectedTacticId) => errors.indexOf(selectedTacticId) !== -1,
);
