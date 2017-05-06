/* eslint-disable no-underscore-dangle */
/* global DEVELOPMENT */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import globalErrorMiddleware from '../middlewares/global-error-middleware';
import normalizeMiddleware from '../middlewares/normalize-middleware';
import reducers from '../reducers/index';

const configureStore = preloadedState => createStore(reducers,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(globalErrorMiddleware),
      applyMiddleware(promiseMiddleware()),
      applyMiddleware(normalizeMiddleware),
      DEVELOPMENT && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

export default configureStore;
