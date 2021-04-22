/* global DEVELOPMENT */
// noinspection JSUnresolvedVariable

import {
  GLOBAL_ERROR,
  RECEIVE_ENTITY,
} from './constants';

export const handleError = (error) => {
  if (DEVELOPMENT) console.warn(error); // eslint-disable-line no-console

  return {
    type: GLOBAL_ERROR,
    error,
  };
};

export const receiveEntity = (data, schema) => ({
  type: RECEIVE_ENTITY,
  payload: { data },
  meta: {
    schema,
  },
});
