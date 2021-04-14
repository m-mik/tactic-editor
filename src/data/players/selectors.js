import { createSelector } from 'reselect';

import { selectTeamFromProps, selectTeamPlayerItems } from '../teams/selectors';
import { isBenchPlayer, isFieldPlayer } from '../../lib/footballField';

export const selectPlayers = state => state.data.players;
export const selectPlayerFromProps = (_, props) => props.player;

export const selectPlayerTransitions = state => state.editor.playerTransitions;

export const makeSelectTeamPlayers = ({ filter = '', convertToObject = true }) =>
  createSelector(
    [selectTeamPlayerItems, selectPlayers, selectPlayerTransitions],
    (playerItems, players, transitions) => {
      const filterTypes = {
        bench: isBenchPlayer,
        field: isFieldPlayer,
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

export const makeSelectPlayerStats = () =>
  createSelector([selectTeamFromProps, selectPlayerFromProps], (team, player) => {
    if (!team || !player) return {};
    return ({
      goals: team.goals.filter(g => !g.ownGoal && (g.playerId === player.id)).length,
      ownGoals: team.goals.filter(g => g.ownGoal && (g.playerId === player.id)).length,
      assists: team.goals.filter(g => !g.ownGoal && (g.assistedBy === player.id)).length,
      yellowCards: team.yellowCards.filter(yc => yc.playerId === player.id).length,
      redCards: team.redCards.filter(rc => rc.playerId === player.id).length,
    });
  });
