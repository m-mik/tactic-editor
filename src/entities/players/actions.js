import { UPDATE_PLAYER, UPDATE_PLAYERS } from './constants';
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

export const movePlayer = (playerId, position) => (dispatch) => {
  dispatch(updatePlayer(playerId, { position }));
};

export const swapPlayers = (p1, p2) => (dispatch) => {
  const data = [
    { ...p1, position: p2.position },
    { ...p2, position: p1.position },
  ];
  dispatch(updatePlayers(data));
};
