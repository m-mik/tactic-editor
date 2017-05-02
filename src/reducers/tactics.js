import merge from 'lodash/merge';
import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  byId: {},
  allIds: [],
};

const byId = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.entities && action.entities.tactics) {
        return merge({}, state, action.entities.tactics);
      }
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_SUCCESS:
      return [...state, ...action.ids];
    default:
      return state;
  }
};

const tactics = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_TACTICS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_TACTICS_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    case types.FETCH_TACTICS_SUCCESS:
      return { ...state,
        byId: byId(state.byId, action),
        allIds: allIds(state.allIds, action),
        isFetching: false,
      };
    default:
      return {
        ...state,
        byId: byId(state.byId, action),
        allIds: allIds(state.allIds, action),
      };
  }
};

export default tactics;
