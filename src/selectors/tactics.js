import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import { tacticSchema } from '../constants/Schemas';

const getTactics = state => state.entities.tactics;
const getTeams = state => state.entities.teams;

export const tacticsSelector = createSelector(
  [getTactics], tactics => tactics.items.map(id => tactics.byId[id]),
);

export const tacticsDetailsSelector = createSelector(
  [getTactics, getTeams],
  (tactics, teams) => denormalize(
    tactics.items, [tacticSchema],
    { tactics: tactics.byId, teams: teams.byId },
  ),
);
