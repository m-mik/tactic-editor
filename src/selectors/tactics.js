import { createSelector } from 'reselect';

const getTactics = state => state.entities.tactics;

export const tacticsSelector = createSelector(
  [getTactics], tactics => tactics.allIds.map(id => tactics.byId[id]),
);
