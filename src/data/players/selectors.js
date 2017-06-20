import { createSelector } from 'reselect';

import { selectTeamPlayerItems } from '../teams/selectors';

export const selectPlayers = state => state.data.players;
export const selectPlayerTransitions = state => state.editor.playerTransitions;
export const makeSelectTeamPlayers = () =>
  createSelector(
    [selectTeamPlayerItems, selectPlayers, selectPlayerTransitions],
    (playerItems, players, transitions) => playerItems.map(playerId => players.byId[playerId])
        .reduce((result, player) => ({
          ...result,
          [player.position]: { ...player, transition: transitions[player.id] },
        }), {}),
  );
