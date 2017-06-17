import { createSelector } from 'reselect';

import { selectTeams } from '../../data/teams/selectors';
import { selectPlayers } from '../../data/players/selectors';

export const selectEditedTeamId = state => state.editor.editedTeamId;

export const selectActivePlayerId = state => state.editor.activePlayerId;

export const selectEditedTeam = createSelector(
  [selectTeams, selectEditedTeamId], (teams, editedTeamId) => teams.byId[editedTeamId],
);

export const selectActivePlayer = createSelector(
  [selectPlayers, selectActivePlayerId], (players, activePlayerId) => players.byId[activePlayerId],
);
