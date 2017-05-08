import { schema } from 'normalizr';

const player = new schema.Entity('players');

const team = new schema.Entity('teams', {
  players: [player],
});

const tactic = new schema.Entity('tactics', {
  teams: [team],
});

export { team as teamSchema, tactic as tacticSchema };
