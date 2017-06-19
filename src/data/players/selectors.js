import { createSelector } from 'reselect';

import { selectTeamPlayerItems } from '../teams/selectors';

export const selectPlayers = state => state.data.players;
export const selectPlayerTransitions = state => state.editor.playerTransitions;

export const makeSelectTeamPlayers = () =>
  createSelector(
    [selectTeamPlayerItems, selectPlayers, selectPlayerTransitions],
    (playerItems, players, transitions) => {
      console.log('select team players');
      return playerItems.map(playerId => players.byId[playerId])
        .reduce((result, player) => ({
          ...result,
          [player.position]: { ...player, transition: transitions[player.id] },
        }), {});
    },
  );

const selectPosition = (state, props) => props.position;

export const makeSelectPlayerByPos = () => {
  const selectTeamPlayers = makeSelectTeamPlayers();
  return createSelector(
    [selectTeamPlayers, selectPosition],
    (teamPlayers, position) => teamPlayers[position],
  );
};
