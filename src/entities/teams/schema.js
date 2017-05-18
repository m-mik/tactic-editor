import { schema } from 'normalizr';
import playerSchema from '../players/schema';

const teamSchema = new schema.Entity('teams', {
  players: [playerSchema],
});

export default teamSchema;
