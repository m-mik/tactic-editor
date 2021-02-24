import { createSelector } from 'reselect';
import { selectTeamPlayerItems } from '../teams/selectors';

export const selectPlayers = state => state.data.players;

export const makeSelectTeamPlayers = () =>
  createSelector(
    [selectTeamPlayerItems, selectPlayers],
    (playerItems, players) => playerItems
        .map(playerId => players.byId[playerId])
        .reduce((result, player) => ({ ...result, [player.position]: player }), {}),
);
