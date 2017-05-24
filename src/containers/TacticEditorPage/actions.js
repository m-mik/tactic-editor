import { ADD_PLAYER_TRANSITION, REMOVE_PLAYER_TRANSITION } from './constants';

export const addPlayerTransition = (playerId, offset) => ({
  type: ADD_PLAYER_TRANSITION,
  payload: {
    playerId,
    offset,
  },
});

export const removePlayerTransition = playerId => ({
  type: REMOVE_PLAYER_TRANSITION,
  payload: playerId,
});
