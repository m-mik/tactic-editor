import { createSelector } from 'reselect';

import { selectTeams } from '../../data/teams/selectors';
import { selectPlayers } from '../../data/players/selectors';

export const selectEditedTeamId = state => state.editor.editedTeamId;
export const selectActiveTacticId = state => state.editor.activeTacticId;
export const selectActivePlayerId = state => state.editor.activePlayerId;
export const selectPlayersToReplace = state => state.editor.playersToReplace;
export const selectUnsavedTacticIds = state => state.editor.unsavedTacticIds;
export const selectIsSavingTactic = state => state.editor.isSavingTactic;

export const selectEditedTeam = createSelector(
  [selectTeams, selectEditedTeamId], (teams, editedTeamId) => teams.byId[editedTeamId],
);

export const selectActivePlayer = createSelector(
  [selectPlayers, selectActivePlayerId], (players, activePlayerId) => players.byId[activePlayerId],
);

export const selectIsDeleteTacticDialogOpen = state => state.editor.isDeleteTacticDialogOpen;
// noinspection JSUnusedGlobalSymbols
export const selectIsCreateTacticDialogOpen = state => state.editor.isCreateTacticDialogOpen;
