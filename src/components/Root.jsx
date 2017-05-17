import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../assets/theme/main';
import App from '../containers/App';
import Sidebar from '../containers/Sidebar';
import Main from './Main';
import TacticEditorPage from '../containers/TacticEditorPage';
import history from '../history';

const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Route path="/(tactics/)?:id?" component={Sidebar} />
          <Main>
            <Route path="/tactics/:id" component={TacticEditorPage} />
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
