import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../routes';

import App from './App';

export default class Root extends Component {
  render() {
    const { store } = this.props;

    if (!this.routes) this.routes = routes;

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={App} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
