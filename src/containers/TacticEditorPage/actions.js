import { findTeamGrid } from '../../lib/footballField';
import { updatePlayer, updatePlayers } from '../../data/players/actions';
import {
  ADD_PLAYER_TRANSITIONS,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
  OPEN_EDIT_TEAM_DIALOG,
  CLOSE_EDIT_TEAM_DIALOG,
} from './constants';

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
  const offset = findTeamGrid(player.team.id)
    .findTileOffset({ from: player.position, to: newPosition });
  dispatch(addPlayerTransitions({ [player.id]: offset }));
  dispatch(updatePlayer(player.id, { position: newPosition }));
  setTimeout(() => dispatch(removePlayerTransitions([player.id])), 0);
};

export const movePlayers = data => (dispatch) => {
  const playerTransData = data.reduce((result, item) => {
    const { player, targetPos } = item;
    const offset = findTeamGrid(player.team.id)
      .findTileOffset({ from: player.position, to: targetPos });
    return { ...result, [player.id]: offset };
  }, {});
  dispatch(addPlayerTransitions(playerTransData));
  const playerPosData = data.map(item => ({ id: item.player.id, position: item.targetPos }));
  dispatch(updatePlayers(playerPosData));
  setTimeout(() => dispatch(removePlayerTransitions(Object.keys(playerTransData))), 0);
};

export const swapPlayers = (p1, p2) => (dispatch) => {
  dispatch(movePlayers([
    { player: p1, targetPos: p2.position },
    { player: p2, targetPos: p1.position },
  ]));
};

export const selectPlayer = id => ({
  type: SELECT_PLAYER,
  payload: id,
});

export const updateFormation = (team, formation) => (dispatch) => {
  const { players } = team;
  const playerData = [];
  Object.keys(players).sort((a, b) => a - b).forEach((pos, i) => {
    const player = players[pos];
    const targetPos = formation.positions[i];
    if (player.position !== targetPos) {
      playerData.push({
        player: { ...player, team: { id: team.id } },
        targetPos,
      });
    }
  });
  dispatch(movePlayers(playerData));
};
