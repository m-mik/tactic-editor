/* eslint-disable no-underscore-dangle */
/* global DEVELOPMENT */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import normalizeMiddleware from '../middlewares/normalizeMiddleware';
import reducers from './reducers';

const composeEnhancers = (DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const configureStore = preloadedState => createStore(reducers,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(promiseMiddleware()),
    applyMiddleware(normalizeMiddleware),
  ),
);

export default configureStore;
