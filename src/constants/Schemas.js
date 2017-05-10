import { schema } from 'normalizr';

const player = new schema.Entity('players');

const team = new schema.Entity('teams', {
  players: [player],
});

const tactic = new schema.Entity('tactics');

const tacticDetail = new schema.Entity('tacticDetails', {
  teams: [team],
});

export {
  team as teamSchema,
  tactic as tacticSchema,
  tacticDetail as tacticDetailSchema,
};
