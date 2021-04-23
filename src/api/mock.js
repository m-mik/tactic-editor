// noinspection JSUnresolvedFunction

import axios from 'axios';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import get from 'lodash/get';
import times from 'lodash/times';
import MockAdapter from 'axios-mock-adapter';
import defaultTactics from './tactics.json';
import defaultTeam from '../lib/footballField/defaultTeam.json';
import * as storage from './localStorage';
import formations from '../lib/footballField/formations.json';
import { TILES_COUNT } from '../lib/footballField';

const DEFAULT_SUB_COUNT = 7;

if (storage.isNewUser()) storage.saveTactics(defaultTactics);
const tactics = storage.loadTactics();

const mockApi = () => {
  const mock = new MockAdapter(axios, { delayResponse: 400 });

  const lastTactic = tactics[tactics.length - 1];

  const lastIdByEntity = {
    tactics: get(lastTactic, 'id', 0),
    teams: get(lastTactic, 'teams[1].id', 0),
    players: get(lastTactic, 'teams[1].players', [{ id: 0 }]).reduce((maxId, player) =>
      Math.max(player.id, maxId), 0),
  };

  const nextId = (key) => {
    lastIdByEntity[key] += 1;
    return lastIdByEntity[key];
  };

  const position = (index, formation) => {
    const positions = formation.positions;
    if (index < positions.length) {
      return positions[index];
    } else if (index < (11 + DEFAULT_SUB_COUNT)) {
      return (TILES_COUNT + index) - 11;
    }
    return -1;
  };

  const generatePlayer = index => ({
    id: nextId('players'),
    name: 'Player',
    number: index + 1,
    position: position(index, formations[1]),
    rating: 5,
  });

  const generateTeam = () => ({
    ...defaultTeam, id: nextId('teams'), players: times(22, generatePlayer),
  });

  const generateTactic = data => ({
    id: nextId('tactics'),
    teams: times(2, generateTeam),
    options: {
      showGrid: false,
      showNames: true,
      showRatings: true,
      showNumbers: true,
      showCards: true,
      showGoals: true,
      showAssists: true,
      showSubstitutions: true,
      showMinutes: true,
      showSummary: true,
    },
    ...data,
  });

  mock.onGet('/tactics').reply(() => [200, tactics.map(tactic => omit(tactic, ['teams', 'options']))]);

  mock.onGet(/\/tactics\/\d+/).reply((config) => {
    const id = +config.url.split('/').pop();
    const tactic = tactics.find(t => t.id === id);
    if (!tactic) {
      return [404, []];
    }
    return [200, pick(tactic, ['id', 'teams', 'options'])];
  });

  mock.onPost(/\/tactics(\?clone=true)?/).reply((config) => {
    const data = JSON.parse(config.data);
    const url = config.url;
    const newTactic = generateTactic(data);

    if (url.includes('?clone=true')) {
      console.log('clone tactic');
      const tacticToClone = storage.loadTactic(data.id);
      console.log(tacticToClone);
    }

    storage.saveTactic(newTactic);
    return [201, newTactic];
  });

  mock.onDelete(/\/tactics\/\d+/).reply((config) => {
    const id = +config.url.split('/').pop();
    storage.deleteTactic(id);
    return [204];
  });

  mock.onPut(/\/tactics\/\d+/).reply((config) => {
    const tactic = JSON.parse(config.data);
    storage.saveTactic(tactic);
    return [200];
  });
};

export default mockApi;
