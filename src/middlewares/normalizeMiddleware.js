import { normalize } from 'normalizr';

const normalizeMiddleware = () => next => (action) => {
  const { meta, ...actionWithoutMeta } = action;
  const schema = meta && meta.schema;
  const payload = action.payload;
  const data = payload && payload.data;

  if (schema && data) {
    const normalized = normalize(data, schema);
    return next({ ...actionWithoutMeta, payload: normalized });
  }

  return next(action);
};

export default normalizeMiddleware;
