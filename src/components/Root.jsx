import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../assets/theme/main';
import AppContainer from '../containers/AppContainer';
import Sidebar from './layout/Sidebar';
import Main from './layout/Main';
import TacticListContainer from '../containers/tactics/TacticListContainer';
import TacticDetailContainer from '../containers/tactics/TacticDetailContainer';

const Root = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Sidebar>
            <Route path="/(tactics/)?:id?" component={TacticListContainer} />
          </Sidebar>
          <Main>
            <Route path="/tactics/:id" component={TacticDetailContainer} />
          </Main>
        </AppContainer>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
