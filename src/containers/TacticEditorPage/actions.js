import { findTeamGrid } from '../../lib/footballField';
import { updatePlayer, updatePlayers } from '../../entities/players/actions';
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

export const swapPlayers = (p1, p2) => (dispatch) => {
  const { left, top } = findTeamGrid(p1.team.id).findTileOffset(
    { from: p1.position, to: p2.position },
  );
  dispatch(addPlayerTransitions({
    [p1.id]: { left, top },
    [p2.id]: { left: -left, top: -top },
  }));
  dispatch(updatePlayers([
    { id: p1.id, position: p2.position },
    { id: p2.id, position: p1.position },
  ]));
  setTimeout(() => dispatch(removePlayerTransitions([p1.id, p2.id])), 0);
};

export const selectPlayer = id => ({
  type: SELECT_PLAYER,
  payload: id,
});

export const updateFormation = (team, formation) => (dispatch) => {
  const { players } = team;
  Object.keys(players).sort((a, b) => a - b).forEach((pos, i) => {
    const player = players[pos];
    const targetPos = formation.positions[i];
    if (player.position !== targetPos) {
      dispatch(movePlayer({ ...player, team: { id: team.id } }, targetPos));
    }
  });
};
