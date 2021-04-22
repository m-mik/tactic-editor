import { findTileOffset, isFieldPlayer } from '../../lib/footballField';
import { updatePlayer, updatePlayers } from '../../data/players/actions';
import {
  ADD_PLAYER_TRANSITIONS,
  CLOSE_EDIT_TEAM_DIALOG,
  OPEN_EDIT_TEAM_DIALOG,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
  SET_PLAYERS_TO_REPLACE,
  OPEN_CREATE_TACTIC_DIALOG,
  CLOSE_CREATE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG, SELECT_TACTIC,
} from './constants';
import history from '../../history';

export const selectTactic = id => (dispatch) => {
  if (!isNaN(id)) {
    history.push(`/tactics/${id}`);
    dispatch({ type: SELECT_TACTIC, id });
  }
};

export const openEditTeamDialog = teamId => ({ type: OPEN_EDIT_TEAM_DIALOG, payload: teamId });
export const closeEditTeamDialog = () => ({ type: CLOSE_EDIT_TEAM_DIALOG });

export const addPlayerTransitions = data => ({
  type: ADD_PLAYER_TRANSITIONS,
  payload: data,
});

export const removePlayerTransitions = data => ({
  type: REMOVE_PLAYER_TRANSITIONS,
  payload: data,
});

export const movePlayer = (player, newPosition) => (dispatch) => {
  const offset = findTileOffset({ from: player.position, to: newPosition }, player.team.id);
  dispatch(addPlayerTransitions({ [player.id]: offset }));
  dispatch(updatePlayer(player.id, { position: newPosition }));
  setTimeout(() => dispatch(removePlayerTransitions([player.id])), 0);
};

export const movePlayers = data => (dispatch) => {
  const playerTransData = data
    .reduce((result, item) => {
      const { player, targetPos } = item;
      const offset = findTileOffset({ from: player.position, to: targetPos }, player.team.id);
      return offset ? { ...result, [player.id]: offset } : result;
    }, {});
  dispatch(addPlayerTransitions(playerTransData));
  const playerPosData = data.map(item => ({ id: item.player.id, position: item.targetPos }));
  dispatch(updatePlayers(playerPosData));
  setTimeout(() => dispatch(removePlayerTransitions(Object.keys(playerTransData))), 0);
};

export const setPlayersToReplace = players => ({
  type: SET_PLAYERS_TO_REPLACE,
  payload: players,
});

export const swapPlayers = (p1, p2) => (dispatch) => {
  dispatch(movePlayers([
    { player: p1, targetPos: p2.position },
    { player: p2, targetPos: p1.position },
  ]));
  dispatch(setPlayersToReplace(null));
};

export const selectPlayer = id => ({
  type: SELECT_PLAYER,
  payload: id,
});

export const updateFormation = (team, formation) => (dispatch) => {
  const { players } = team;
  const playerData = Object.keys(players)
    .map(pos => players[pos])
    .filter(isFieldPlayer)
    .map((player, i) => ({
      player: { ...player, team: { id: team.id } },
      targetPos: formation.positions[i],
    }));
  dispatch(movePlayers(playerData));
};

export const openCreateTacticDialog = () => ({ type: OPEN_CREATE_TACTIC_DIALOG });
export const closeCreateTacticDialog = () => ({ type: CLOSE_CREATE_TACTIC_DIALOG });
export const openDeleteTacticDialog = () => ({ type: OPEN_DELETE_TACTIC_DIALOG });
export const closeDeleteTacticDialog = () => ({ type: CLOSE_DELETE_TACTIC_DIALOG });
