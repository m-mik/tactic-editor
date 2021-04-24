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

const mockApi = () => {
  const mock = new MockAdapter(axios, { delayResponse: 400 });

  const lastTactic = storage.loadLastTactic();

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

  const generateTactic = (data = {}) => ({
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

  const copyTactic = (id) => {
    const tacticToCopy = storage.loadTactic(id);
    return {
      ...tacticToCopy,
      id: nextId('tactics'),
      name: `Copy of ${tacticToCopy.name}`.substr(0, 30),
      teams: tacticToCopy.teams.map(team => ({
        ...team,
        id: nextId('teams'),
        players: team.players.map(player => ({
          ...player,
          id: nextId('players'),
        })),
        substitutions: [],
        goals: [],
        yellowCards: [],
        redCards: [],
      })),
    };
  };

  mock.onGet('/tactics').reply(() => {
    const tactics = storage.loadTactics();
    return [200, tactics.map(tactic => omit(tactic, ['teams', 'options']))];
  });

  mock.onGet(/\/tactics\/\d+/).reply((config) => {
    const id = +config.url.split('/').pop();
    const tactics = storage.loadTactics();
    const tactic = tactics.find(t => t.id === id);
    if (!tactic) {
      return [404, []];
    }
    return [200, pick(tactic, ['id', 'teams', 'options'])];
  });

  mock.onPost(/\/tactics(\?copy=true)?/).reply((config) => {
    const data = JSON.parse(config.data);
    const url = config.url;
    const shouldCopyTactic = url.includes('?copy=true');
    const newTactic = shouldCopyTactic ? copyTactic(data.id) : generateTactic(data);
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
