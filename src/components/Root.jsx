import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import theme from '../assets/theme/main';
import history from '../history';
import App from '../containers/App';
import Sidebar from './Sidebar';
import Main from './Main';
import TacticPage from '../containers/TacticPage';
import TacticListContainer from '../containers/TacticListContainer';
import TacticSettingsContainer from '../containers/TacticSettingsContainer';

const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Sidebar>
            <Paper zDepth={3}>
              {/*<TacticSettingsContainer /> todo*/}
            </Paper>
            <Paper zDepth={3}>
              <Route path="/(tactics/)?:id?" component={TacticListContainer} />
            </Paper>
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
