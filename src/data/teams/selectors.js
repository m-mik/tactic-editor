import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import teamSchema from './schema';

const getTeam = (state, props) => state.data.teams[props.teamid];

export const makeTeamSelector = () => createSelector(
  [getTacticDetails, getTactics, getTeams, getPlayers, getSelectedTacticId, getPlayerTransitions],
  (tacticDetails, tactics, teams, players, activeTacticId, playerTransitions) => {

    const denormalized = denormalize(
      teamId,
      teamSchema,
      { ...mapValues(data, value => value.byId) },
    );
};

// todo