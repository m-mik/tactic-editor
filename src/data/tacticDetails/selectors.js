import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import mapValues from 'lodash/mapValues';

import { selectActiveTacticId } from '../../containers/App/selectors';
import tacticDetailSchema from './schema';

const selectTacticDetails = state => state.data.tacticDetails;

const getFetching = state => state.data.tacticDetails.status.fetching;
const getErrors = state => state.data.tacticDetails.status.errors;
const getTeams = state => state.data.teams;
const getPlayers = state => state.data.players;
const getPlayerTransitions = state => state.editor.playerTransitions;
const getTactics = state => state.data.tactics;

const getTeamWithPlayerTrans = (denormalizedTeam, playerTransitions) => {
  const playersWithTrans = denormalizedTeam.players.map(player =>
    ({ ...player, transition: playerTransitions[player.id] }),
  );
  return { ...denormalizedTeam, players: playersWithTrans };
};

const getPlayersByPosForTeam = denormalizedTeam =>
  denormalizedTeam.players.reduce((result, player) =>
    ({ ...result, [player.position]: player }), {});

const getTeamsWithPlayersByPos = denormalizedTeams =>
  denormalizedTeams.map(team =>
    ({ ...team, players: getPlayersByPosForTeam(team) }),
  );

export const makeSelectTacticDetail = () => createSelector(
  [selectTacticDetails, selectActiveTacticId],
  (tacticDetails, activeTacticId) => tacticDetails.byId[activeTacticId],
);

export const makeSelectOptions = () => createSelector(
  [makeSelectTacticDetail()], tacticDetail => tacticDetail.options,
);


//
// export const tacticDetailSelector = createSelector(
//   [getTacticDetails, getTactics, getTeams, getPlayers, getSelectedTacticId, getPlayerTransitions],
//   (tacticDetails, tactics, teams, players, activeTacticId, playerTransitions) => {
//     const data = { tacticDetails, teams, players };
//     if (!Object.keys(data.teams.byId).length) return null;
//     const denormalized = denormalize(
//       activeTacticId,
//       tacticDetailSchema,
//       { ...mapValues(data, value => value.byId) },
//     );
// // todo
//     if (denormalized) {
//       const teamsWithPlayerTrans = denormalized.teams.map(team =>
//         getTeamWithPlayerTrans(team, playerTransitions),
//       );
//       return {
//         ...denormalized,
//         name: tactics.byId[activeTacticId].name,
//         teams: getTeamsWithPlayersByPos(teamsWithPlayerTrans),
//       };
//     }
//     return null;
//   },
// );

export const isFetchingSelector = createSelector(
  [getFetching, selectActiveTacticId],
  (fetching, activeTacticId) => fetching.includes(activeTacticId),
);

export const hasErrorSelector = createSelector(
  [getErrors, selectActiveTacticId],
  (errors, activeTacticId) => errors.includes(activeTacticId),
);
