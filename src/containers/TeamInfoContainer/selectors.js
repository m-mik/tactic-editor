import { createSelector } from 'reselect';

import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { selectTeam } from '../../data/teams/selectors';

export const makeSelectTeamInfo = () => {
  const selectTeamPlayers = makeSelectTeamPlayers();
  return createSelector([selectTeam, selectTeamPlayers],
    (team, players) => {
      if (!team) return null;
      return ({ ...team, players });
    });
};
