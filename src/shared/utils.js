// noinspection JSUnusedGlobalSymbols
// eslint-disable-next-line import/prefer-default-export
export const createObjectFromArray = array => byProperty => array
  .reduce((res, sub) => ({ ...res, [sub[byProperty]]: sub }), {});
