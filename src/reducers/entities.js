import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import tactics from './tactics';

const actionContainsEntities = action => action.response && action.response.entities;

const mapEntitiesToState = (entities) => {
  const entityKeys = Object.keys(entities);
  return entityKeys.map(key => (
    { [key]: { byId: entities[key] } }
  ));
};

const entities = (state = {}, action) => {
  let newState = { ...state };

  if (actionContainsEntities(action)) {
    const mappedEntities = mapEntitiesToState(action.response.entities);
    newState = merge({}, newState, ...mappedEntities);
  }

  return combineReducers({
    tactics,
  })(newState, action);
};

export default entities;
