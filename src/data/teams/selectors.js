export const selectTeam = (state, props) => state.data.teams.byId[props.teamId];

export const selectTeamPlayerItems = (state, props) => state.data.teams.byId[props.teamId].players;
