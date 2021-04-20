import { createSelector } from 'reselect';

const selectPlayers = state => state.data.players;
export const selectTeams = state => state.data.teams;
export const selectTeam = (state, props) => state.data.teams.byId[props.teamId];
export const selectTeamFromProps = (_, props) => props.team;

export const selectTeamPlayerItems = (state, props) => {
  const team = selectTeam(state, props);
  return team ? team.players : [];
};

export const selectDenormalizedSubstitutions = createSelector(
  [selectTeam, selectPlayers],
  (team, players) => team.substitutions.map(sub => ({
    ...sub, players: sub.players.map(playerId => players.byId[playerId]),
  })),
);
