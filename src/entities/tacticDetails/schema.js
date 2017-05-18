import { schema } from 'normalizr';
import teamSchema from '../teams/schema';

const tacticDetailSchema = new schema.Entity('tacticDetails', {
  teams: [teamSchema],
});

export default tacticDetailSchema;
