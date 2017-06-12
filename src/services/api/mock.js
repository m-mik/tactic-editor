import axios from 'axios';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import times from 'lodash/times';
import MockAdapter from 'axios-mock-adapter';
import tactics from './tactics.json';
import defaultTeam from '../../lib/footballField/defaultTeam.json';

const mockApi = () => {
  const mock = new MockAdapter(axios, { delayResponse: 500 });

  const lastTactic = tactics[tactics.length - 1];

  const lastId = {
    tactics: lastTactic.id,
    teams: lastTactic.teams[1].id,
    players: lastTactic.teams[1].players.reduce((maxId, player) => {
      const id = player.id;
      return id > maxId ? id : maxId;
    }, 0),
  };

  const nextId = (key) => {
    lastId[key] += 1;
    return lastId[key];
  };

  const generatePlayer = index => ({
    id: nextId('players'),
    name: 'Player',
    number: index + 1,
    position: 18,
    rating: 5,
    cards: {
      yellow: 0,
      red: 0,
    },
    goals: 0,
    assists: 0,
  });

  const generateTeam = () => ({
    ...defaultTeam, id: nextId('teams'), players: times(11, generatePlayer),
  });

  mock.onGet('/tactics').reply(200, tactics.map(tactic => omit(tactic, ['teams', 'options'])));

  mock.onGet(/\/tactics\/\d+/).reply((config) => {
    const id = +config.url.split('/').pop();
    const tactic = tactics.filter(t => t.id === id).shift();
    if (!tactic) {
      return [404, []];
    }
    return [200, pick(tactic, ['id', 'teams', 'options'])];
  });

  mock.onPost('/tactics').reply(() => [201, {
    id: nextId('tactics'),
    teams: times(2, generateTeam),
    options: {
      showGrid: false,
      showName: true,
      showRatings: true,
      showNumbers: true,
      showCards: true,
      showGoals: true,
      showAssists: true,
    },
  }]);

  mock.onDelete(/\/tactics\/\d+/).reply(() => [204]);
};

export default mockApi;
