import { UPDATE_PLAYER, UPDATE_PLAYERS } from './constants';
import {
  addPlayerTransition,
  removePlayerTransition,
} from '../../containers/TacticEditorPage/actions';
import playerSchema from './schema';

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

export const movePlayer = (playerId, newPosition, offset) => (dispatch) => {
  if (offset) {
    dispatch(addPlayerTransition(playerId, offset));
    dispatch(updatePlayer(playerId, { position: newPosition }));
  }
  setTimeout(() => dispatch(removePlayerTransition(playerId)), 0);
};

export const swapPlayers = (p1, p2) => (dispatch) => {
  const data = [
    { ...p1, position: p2.position },
    { ...p2, position: p1.position },
  ];
  dispatch(updatePlayers(data));
};
