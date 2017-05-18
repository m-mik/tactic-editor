import { combineReducers } from 'redux';
import merge from 'lodash/merge';
import tactics from './tactics/reducer';
import tacticDetails from './tacticDetails/reducer';
import teams from './teams/reducer';
import players from './players/reducer';

const mapEntitiesToState = (entities) => {
  const entityKeys = Object.keys(entities);
  return entityKeys.map(key =>
    ({ [key]: { byId: entities[key] } }),
  );
};

const entities = (state = {}, action) => {
  let newState = { ...state };
  const payloadEntities = action.payload && action.payload.entities;

  if (payloadEntities) {
    const mappedEntities = mapEntitiesToState(payloadEntities);
    newState = merge({}, newState, ...mappedEntities);
  }

  return combineReducers({
    tactics,
    tacticDetails,
    teams,
    players,
  })(newState, action);
};

export default entities;
