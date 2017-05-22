import { UPDATE_PLAYER } from './constants';
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

export const movePlayer = (playerId, position) => (dispatch) => {
  dispatch(updatePlayer(playerId, { position }));
};
