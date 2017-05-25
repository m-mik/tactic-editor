import { ADD_PLAYER_TRANSITIONS, REMOVE_PLAYER_TRANSITIONS } from './constants';

export const addPlayerTransitions = data => ({
  type: ADD_PLAYER_TRANSITIONS,
  payload: data,
});

export const removePlayerTransitions = data => ({
  type: REMOVE_PLAYER_TRANSITIONS,
  payload: data,
});
