/* global DEVELOPMENT */
/* eslint-disable no-console */

const globalErrorMiddleware = () => next => (action) => {
  const isPromise = (value) => {
    if (value !== null && typeof value === 'object') {
      return value && typeof value.then === 'function';
    }

    return false;
  };

  if (!isPromise(action.payload)) {
    return next(action);
  }

  return next(action).catch((error) => {
    if (DEVELOPMENT) {
      console.warn(`${action.type} caught at middleware with reason: ${JSON.stringify(error)}.`);
    }

    return error;
  });
};


export default globalErrorMiddleware;
