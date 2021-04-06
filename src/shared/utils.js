export const createObjectFromArray = array => byProperty => array
  .reduce((res, sub) => ({ ...res, [sub[byProperty]]: sub }), {});
