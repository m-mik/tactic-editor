import { createSelector } from 'reselect';

import { selectTeamPlayerItems } from '../teams/selectors';
import { TILES_COUNT } from '../../lib/footballField';

export const selectPlayers = state => state.data.players;

export const selectPlayerTransitions = state => state.editor.playerTransitions;

export const makeSelectTeamPlayers = ({ filter = '', convertToObject = true }) =>
  createSelector(
    [selectTeamPlayerItems, selectPlayers, selectPlayerTransitions],
    (playerItems, players, transitions) => {
      const filterTypes = {
        bench: player => player.position >= TILES_COUNT,
        field: player => player.position < TILES_COUNT,
      };

      const predicate = filterTypes[filter];
      let playersArray = playerItems.map(playerId => players.byId[playerId]);

      if (predicate) {
        playersArray = playersArray.filter(predicate);
      }

      if (!convertToObject) return playersArray;

      return playersArray.reduce((result, player) => ({
        ...result,
        [player.position]: { ...player, transition: transitions[player.id] },
      }), {});
    },
  );
