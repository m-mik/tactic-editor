import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import mapValues from 'lodash/mapValues';

import teamSchema from '../teams/schema';
import { selectActiveTacticId } from '../../containers/App/selectors';
import { selectTactics } from '../tactics/selectors';
import { selectTeams } from '../teams/selectors';
import { selectPlayers } from '../players/selectors';

export const selectTacticDetails = state => state.data.tacticDetails;
export const selectFetchingItems = state => state.data.tacticDetails.status.fetching;
export const selectErrorItems = state => state.data.tacticDetails.status.errors;

export const makeSelectTacticDetail = () => createSelector(
  [selectTacticDetails, selectActiveTacticId],
  (tacticDetails, activeTacticId) => tacticDetails.byId[activeTacticId],
);

export const makeSelectTacticDetailTeams = () => createSelector(
  [makeSelectTacticDetail(), selectTeams],
  (tacticDetail, teams) => {
    const teamIds = (tacticDetail && tacticDetail.teams) || [];
    return teamIds.map(teamId => teams.byId[teamId]);
  },
);

export const makeSelectOptions = () => {
  const selectTacticDetail = makeSelectTacticDetail();
  return createSelector([selectTacticDetail], tacticDetail => tacticDetail && tacticDetail.options);
};

export const makeSelectPlayerOptions = () => {
  const selectOptions = makeSelectOptions();
  return createSelector([selectOptions], options => ({
    showName: options.showNames,
    showRating: options.showRatings,
    showNumber: options.showNumbers,
    showCards: options.showCards,
    showGoals: options.showGoals,
    showAssists: options.showAssists,
    showSubstitution: options.showSubstitutions,
  }));
};

export const selectDenormalizedTeams = createSelector(
  [selectTeams, selectPlayers, makeSelectTacticDetail()],
  (teams, players, tacticDetail) => {
    if (!tacticDetail) return [];

    const data = {
      teams: {
        byId: tacticDetail.teams.reduce((res, teamId) => ({
          ...res,
          [teamId]: teams.byId[teamId],
        }), {}),
      },
      players,
    };

    return denormalize(
      tacticDetail.teams,
      [teamSchema],
      { ...mapValues(data, value => value.byId) },
    );
  },
);

export const makeSelectFullTacticDetail = () => createSelector(
  [selectTacticDetails, selectTactics, selectDenormalizedTeams, selectActiveTacticId],
  (tacticDetails, tactics, teams, activeTacticId) => {
    const tactic = tactics.byId[activeTacticId];
    const tacticDetail = tacticDetails.byId[activeTacticId];
    if (!tactic || !tacticDetail) return null;

    return { ...tacticDetail, ...tactic, teams };
  },
);

export const makeSelectMatchSummary = () => createSelector(
  [makeSelectTacticDetail(), selectTeams, selectPlayers],
  (tacticDetail, teams, players) => {
    if (!tacticDetail || !Object.keys(teams.byId).length) return null;

    const player = playerId => players.byId[playerId];
    const side = index => (index === 0 ? 'home' : 'away');
    const mapStats = (stats, statName, index) => stats.map((stat) => {
      const newStat = { ...stat, type: statName, side: side(index), player: player(stat.playerId) };
      return (statName === 'goal' && !stat.ownGoal)
        ? { ...newStat, assistedBy: player(newStat.assistedBy) }
        : newStat;
    });

    const selectedTacticTeams = tacticDetail.teams.map(teamId => teams.byId[teamId]);
    const events = selectedTacticTeams.flatMap((team, index) => [
      ...mapStats(team.yellowCards, 'yellowCard', index),
      ...mapStats(team.redCards, 'redCard', index),
      ...mapStats(team.goals, 'goal', index),
      ...team.substitutions.map(sub => ({
        ...sub, type: 'substitution', teamId: team.id, side: side(index), players: sub.players.map(player),
      })),
    ]);

    events.sort((ev1, ev2) => ev1.minute - ev2.minute);

    return {
      teams: tacticDetail.teams.map(teamId => teams.byId[teamId]),
      events,
    };
  });

export const selectIsFetching = createSelector(
  [selectFetchingItems, selectActiveTacticId],
  (fetching, activeTacticId) => fetching.includes(activeTacticId),
);

export const selectHasError = createSelector(
  [selectErrorItems, selectActiveTacticId],
  (errors, activeTacticId) => errors.includes(activeTacticId),
);

