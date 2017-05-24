import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import entities from '../entities/reducer';
import app from '../containers/App/reducer';
import sidebar from '../containers/Sidebar/reducer';
import editor from '../containers/TacticEditorPage/reducer';

const rootReducer = combineReducers({
  app,
  entities,
  sidebar,
  form,
  editor,
});

export default rootReducer;
