import { UPDATE_PLAYER, UPDATE_PLAYERS } from './constants';
import {
  addPlayerTransitions,
  removePlayerTransitions,
} from '../../containers/TacticEditorPage/actions';
import playerSchema from './schema';
import { findTeamGrid } from '../../services/footballField';

export const updatePlayer = (id, playerData) => ({
  type: UPDATE_PLAYER,
  payload: {
    data: { id, ...playerData },
  },
  meta: {
    schema: playerSchema,
    data: { id },
  },
});

export const updatePlayers = data => ({
  type: UPDATE_PLAYERS,
  payload: { data },
  meta: {
    schema: [playerSchema],
  },
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
