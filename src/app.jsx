/* global PRODUCTION, DEVELOPMENT */
/* eslint-disable global-require */
// noinspection JSCheckFunctionSignatures

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './components/Root';
import configureStore from './store/configureStore';
import mockApi from './api/mock';
import './assets/styles/base.scss';
import { setLastVisit } from './api/localStorage';

injectTapEventPlugin();
mockApi();
setLastVisit();

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    render();
  });
}

/*
if (DEVELOPMENT) {
  const Perf = require('react-addons-perf');
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, { include: /^TileContainer/ });
  window.Perf = Perf;
}
*/
