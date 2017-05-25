import { UPDATE_PLAYER, UPDATE_PLAYERS } from './constants';
import {
  addPlayerTransitions,
  removePlayerTransitions,
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
    dispatch(addPlayerTransitions({ [playerId]: offset }));
    dispatch(updatePlayer(playerId, { position: newPosition }));
  }
  setTimeout(() => dispatch(removePlayerTransitions([playerId])), 0);
};

export const swapPlayers = ([source, target]) => (dispatch) => {
  dispatch(addPlayerTransitions(
    { [source.player.id]: source.offset, [target.player.id]: target.offset },
  ));
  const data = [
    { ...source.player, position: target.player.position },
    { ...target.player, position: source.player.position },
  ];
  dispatch(updatePlayers(data));
  setTimeout(() => {
    dispatch(removePlayerTransitions([source.player.id, target.player.id]));
  }, 0);
};
