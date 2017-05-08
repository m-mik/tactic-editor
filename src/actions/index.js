/* global DEVELOPMENT */
import * as types from '../constants/ActionTypes';

export const handleError = (error) => {
  if (DEVELOPMENT) { console.warn(error); } // eslint-disable-line no-console

  return {
    type: types.GLOBAL_ERROR,
    error,
  };
};