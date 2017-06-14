import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import tactics from '../data/tactics/reducer';
import tacticDetails from '../data/tacticDetails/reducer';
import teams from '../data/teams/reducer';
import players from '../data/players/reducer';
import app from '../containers/App/reducer';
import sidebar from '../containers/Sidebar/reducer';
import editor from '../containers/TacticEditorPage/reducer';

const data = combineReducers({ tactics, tacticDetails, teams, players });

const rootReducer = combineReducers({
  app,
  data,
  sidebar,
  form,
  editor,
});

export default rootReducer;
