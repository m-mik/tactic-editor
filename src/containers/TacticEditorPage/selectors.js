import { createSelector } from 'reselect';

const getTeams = state => state.entities.teams;
const getEditedTeamId = state => state.editor.editedTeamId;
const getPlayers = state => state.entities.players;
const getSelectedPlayerId = state => state.editor.selectedPlayerId;

export const editedTeamSelector = createSelector(
  [getTeams, getEditedTeamId], (teams, editedTeamId) => teams.byId[editedTeamId],
);

export const selectedPlayerSelector = createSelector(
  [getPlayers, getSelectedPlayerId], (players, selectedPlayerId) => players.byId[selectedPlayerId],
);
