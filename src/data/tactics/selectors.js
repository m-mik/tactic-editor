import { createSelector } from 'reselect';
import { selectActiveTacticId } from '../../containers/App/selectors';

export const selectTactics = state => state.data.tactics;
export const selectIsFetching = state => state.data.tactics.status.isFetching;
export const selectIsDeleting = state => state.data.tactics.status.isDeleting;

export const selectTacticsArray = createSelector(
  [selectTactics], tactics => tactics.items.map(id => tactics.byId[id]),
);

export const makeSelectTactic = () => createSelector(
  [selectTactics, selectActiveTacticId], (tactics, activeTacticId) => tactics.byId[activeTacticId],
);
