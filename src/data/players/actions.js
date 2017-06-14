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
