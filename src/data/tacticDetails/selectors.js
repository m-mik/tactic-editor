import { createSelector } from 'reselect';

import { selectActiveTacticId } from '../../containers/App/selectors';
import { selectTactics } from '../tactics/selectors';

const selectTacticDetails = state => state.data.tacticDetails;
const selectFetchingItems = state => state.data.tacticDetails.status.fetching;
const selectErrorItems = state => state.data.tacticDetails.status.errors;

export const makeSelectTacticDetail = () => createSelector(
  [selectTacticDetails, selectActiveTacticId],
  (tacticDetails, activeTacticId) => tacticDetails.byId[activeTacticId],
);

export const makeSelectOptions = () => createSelector(
  [makeSelectTacticDetail()], tacticDetail => tacticDetail.options,
);

export const makeSelectFullTacticDetail = () => createSelector(
  [selectTacticDetails, selectTactics, selectActiveTacticId],
  (tacticDetails, tactics, activeTacticId) => {
    const tactic = tactics.byId[activeTacticId];
    const tacticDetail = tacticDetails.byId[activeTacticId];
    if (!tactic || !tacticDetail) return null;
    return { ...tacticDetail, ...tactic };
  },
);

export const selectIsFetching = createSelector(
  [selectFetchingItems, selectActiveTacticId],
  (fetching, activeTacticId) => fetching.includes(activeTacticId),
);

export const selectHasError = createSelector(
  [selectErrorItems, selectActiveTacticId],
  (errors, activeTacticId) => errors.includes(activeTacticId),
);
