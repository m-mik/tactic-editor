import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import theme from '../assets/theme/main';
import history from '../history';
import App from '../containers/App';
import Sidebar from './Sidebar';
import Main from './Main';
import TacticPage from '../pages/TacticPage';
import MatchSummaryContainer from '../containers/MatchSummaryContainer';
import TacticListContainer from '../containers/TacticListContainer';
import TacticSettingsContainer from '../containers/TacticSettingsContainer';

// noinspection JSValidateTypes
const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Sidebar>
            <Route path="/(tactics/)?:id?" component={TacticListContainer} />
            <Route path="/tactics/:id" component={TacticSettingsContainer} />
            <Route path="/tactics/:id" component={MatchSummaryContainer} />
          </Sidebar>
          <Main>
            <Route path="/tactics/:id" component={TacticPage} />
          </Main>
        </App>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
