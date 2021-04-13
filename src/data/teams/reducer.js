import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

import { ADD_TEAM_STAT, REMOVE_TEAM_STAT } from './constants';

const stat = (state, action) => {
  switch (action.type) {
    case ADD_TEAM_STAT:
      return [...state, action.payload.statData];
    case REMOVE_TEAM_STAT:
      return state.filter(s => s.id !== action.payload.statId);
    default:
      return state;
  }
};

const team = (state, action) => {
  switch (action.type) {
    case ADD_TEAM_STAT:
    case REMOVE_TEAM_STAT:
      const { statName, teamId } = action.payload;
      return {
        [teamId]: { ...state, [statName]: stat(state[statName], action) },
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_TEAM_STAT:
    case REMOVE_TEAM_STAT:
      return { ...state, ...team(state[action.payload.teamId], action) };
    default: {
      if (get(action, 'payload.entities.teams')) {
        return merge({}, state, action.payload.entities.teams);
      }
      return state;
    }
  }
};

export default combineReducers({ byId });
