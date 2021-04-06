import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import get from 'lodash/get';

import { ADD_SUBSTITUTION, REMOVE_SUBSTITUTION } from './constants';

const substitution = (state, action) => {
  switch (action.type) {
    case ADD_SUBSTITUTION:
      return [...state, action.payload.substitutionData];
    case REMOVE_SUBSTITUTION:
      return state.filter(sub => sub.id !== action.payload.substitutionId);
    default:
      return state;
  }
};

const team = (state, action) => {
  switch (action.type) {
    case ADD_SUBSTITUTION:
    case REMOVE_SUBSTITUTION:
      return {
        [action.payload.teamId]: {
          ...state,
          substitutions: substitution(state.substitutions, action),
        },
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_SUBSTITUTION:
    case REMOVE_SUBSTITUTION:
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
