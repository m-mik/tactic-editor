import { MOVE_PLAYER, UPDATE_PLAYER } from './constants';
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

export const movePlayer = (player, position) => (dispatch) => {
  console.log(player, position);
  const data = { position };
  console.log(player.id, data);
  dispatch(updatePlayer(player.id, data));
};
