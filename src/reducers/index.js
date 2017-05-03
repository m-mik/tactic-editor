import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import entities from './entities';
import ui from './ui';

const rootReducer = combineReducers({
  entities,
  ui,
  form,
});

export default rootReducer;
