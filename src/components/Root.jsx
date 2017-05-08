import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './../assets/theme/main';
import SideBar from './SideBar';
import TacticContainer from '../containers/tactics/TacticContainer';
import TacticEditorContainer from '../containers/tactics/TacticEditorContainer';

const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router>
        <div className="container">
          <SideBar>
            <Route path="/(tactic/)?:id?" component={TacticContainer} />
          </SideBar>
          <div className="main">
            <Route path="/tactic/:id" component={TacticEditorContainer} />
          </div>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
