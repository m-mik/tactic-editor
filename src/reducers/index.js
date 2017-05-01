import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import tactics from './tactics';

const entities = combineReducers({ tactics });

const rootReducer = combineReducers({
  entities,
  form,
});

export default rootReducer;
