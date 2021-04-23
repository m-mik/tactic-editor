import { UPDATE_PLAYER, UPDATE_PLAYERS } from '../data/players/constants';
import { ADD_TEAM_STAT, REMOVE_TEAM_STAT, UPDATE_TEAM } from '../data/teams/constants';
import { UPDATE_TACTIC } from '../data/tactics/constants';
import { addUnsavedTactic } from '../pages/TacticPage/actions';
import { UPDATE_TACTIC_DETAIL } from '../data/tacticDetails/constants';

const modifyTacticMiddleware = ({ getState, dispatch }) => next => (action) => {
  const id = getState().editor.activeTacticId;
  const modActionTypes = new Set([
    UPDATE_PLAYER, UPDATE_PLAYERS, UPDATE_TEAM, UPDATE_TACTIC, ADD_TEAM_STAT, REMOVE_TEAM_STAT,
    UPDATE_TACTIC_DETAIL,
  ]);

  if (modActionTypes.has(action.type)) {
    dispatch(addUnsavedTactic(id));
  }

  return next(action);
};

export default modifyTacticMiddleware;
