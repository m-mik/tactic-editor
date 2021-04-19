import { findTileOffset, TILES_COUNT } from '../../lib/footballField';
import { updatePlayer, updatePlayers } from '../../data/players/actions';
import {
  ADD_PLAYER_TRANSITIONS,
  CLOSE_EDIT_TEAM_DIALOG,
  OPEN_EDIT_TEAM_DIALOG,
  REMOVE_PLAYER_TRANSITIONS,
  SELECT_PLAYER,
  SET_PLAYERS_TO_REPLACE,
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
  const playerData = [];
  const subCount = 7;
  let benchPos = TILES_COUNT - 1;
  Object.keys(players)
    .sort((a, b) => a - b)
    .forEach((pos, i) => {
      const player = players[pos];
      let targetPos = formation.positions[i];
      if (typeof targetPos === 'undefined') {
        targetPos = i - 11 < subCount ? (benchPos += 1) : -1;
      }
      if (player.position !== targetPos) {
        playerData.push({
          player: { ...player, team: { id: team.id } },
          targetPos,
        });
      }
    });
  dispatch(movePlayers(playerData));
};
