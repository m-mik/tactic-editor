import { UPDATE_TEAM } from './constants';
import teamSchema from './schema';

export const updateTeam = (id, tacticData) => ({
  type: UPDATE_TEAM,
  payload: {
    data: { id, ...tacticData },
  },
  meta: {
    schema: teamSchema,
    data: { id },
  },
});
