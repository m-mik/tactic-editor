import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import mapValues from 'lodash/mapValues';

import teamSchema from './schema';

const selectPlayers = state => state.data.players;
export const selectTeams = state => state.data.teams;
export const selectTeam = (state, props) => state.data.teams.byId[props.teamId];

export const selectTeamPlayerItems = (state, props) => {
  const team = selectTeam(state, props);
  return team ? team.players : [];
};

export const selectDenormalizedTeams = createSelector(
  [selectTeams, selectPlayers],
  (teams, players) => {
    const data = { teams, players };
    return denormalize(
      Object.keys(teams.byId),
      [teamSchema],
      { ...mapValues(data, value => value.byId) },
    );
  },
);

export const selectDenormalizedSubstitutions = createSelector(
  [selectTeam, selectPlayers],
  (team, players) => team.substitutions.map(sub => ({
    ...sub, players: sub.players.map(playerId => players.byId[playerId]),
  })),
);
