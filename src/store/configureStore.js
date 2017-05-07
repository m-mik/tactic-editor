/* eslint-disable no-underscore-dangle */
/* global DEVELOPMENT */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import globalErrorMiddleware from '../middlewares/globalErrorMiddleware';
import normalizeMiddleware from '../middlewares/normalizeMiddleware';
import reducers from '../reducers/index';

const configureStore = preloadedState => createStore(reducers,
    preloadedState,
    compose(
      applyMiddleware(globalErrorMiddleware),
      applyMiddleware(thunkMiddleware),
      applyMiddleware(promiseMiddleware()),
      applyMiddleware(normalizeMiddleware),
      DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

export default configureStore;
