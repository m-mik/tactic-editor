import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import mapValues from 'lodash/mapValues';

import teamSchema from './schema';

const selectPlayers = state => state.data.players;

export const selectTeam = (state, props) => state.data.teams.byId[props.teamId];
export const selectTeams = state => state.data.teams;
export const selectTeamPlayerItems = (state, props) => state.data.teams.byId[props.teamId].players;

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
