/* eslint-disable no-underscore-dangle */
/* global DEVELOPMENT */

import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import normalizeMiddleware from '../middlewares/normalizeMiddleware';
import modifyTacticMiddleware from '../middlewares/modifyTacticMiddleware';
import reducers from './reducers';

// noinspection JSUnresolvedVariable
const composeEnhancers = (DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


// noinspection JSValidateTypes
const configureStore = preloadedState => createStore(
  reducers,
  preloadedState,
  composeEnhancers(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(promiseMiddleware()),
    applyMiddleware(normalizeMiddleware),
    applyMiddleware(modifyTacticMiddleware),
  ),
);

export default configureStore;
