import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SideBar from './SideBar';
import TacticList from '../containers/tactics/TacticList';
import TacticPanel from '../containers/tactics/TacticPanel';

const Root = ({ store }) => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <div className="container">
          <SideBar>
            <Route path="/(tactic/)?:id?" component={TacticList} />
          </SideBar>
          <div>
            <Route path="/tactic/:id" component={TacticPanel} />
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
