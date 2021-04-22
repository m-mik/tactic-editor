import { createSelector } from 'reselect';

import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { selectTeam } from '../../data/teams/selectors';

// eslint-disable-next-line import/prefer-default-export
export const makeSelectTeamInfo = () => {
  const selectTeamPlayers = makeSelectTeamPlayers({ filter: 'field' });
  return createSelector([selectTeam, selectTeamPlayers],
    (team, players) => {
      if (!team) return undefined;
      return ({ ...team, players });
    });
};
