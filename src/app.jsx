import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './components/Root';
import configureStore from './store/configureStore';
import mockApi from './api/mock';
import * as actions from './actions/tactics';
import './assets/styles/main.scss';

injectTapEventPlugin();

const store = configureStore();
mockApi(store);

setInterval(() => store.dispatch(actions.createTactic({ name: 'Tactic'+Date.now() })), 2000);

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
