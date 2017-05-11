import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from '../assets/theme/main';
import Sidebar from '../components/layout/Sidebar';
import Main from '../components/layout/Main';
import TacticListContainer from './tactics/TacticListContainer';
import TacticDetailContainer from './tactics/TacticDetailContainer';

const App = ({ store }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <BrowserRouter>
        <div className="container">
          <Sidebar>
            <Route path="/(tactics/)?:id?" component={TacticListContainer} />
          </Sidebar>
          <Main>
            <Route path="/tactics/:id" component={TacticDetailContainer} />
          </Main>
        </div>
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);

App.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;
//export default withRouter(App);
