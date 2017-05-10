import axios from 'axios';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import MockAdapter from 'axios-mock-adapter';
import tactics from './tactics.json';

const mockApi = (store) => {
  const mock = new MockAdapter(axios, { delayResponse: 500 });

  const getNextIdForEntity = (entityName) => {
    const state = store.getState();
    const items = state.entities[entityName].items;
    return Math.max(...items) + 1;
  };

  mock.onGet('/tactics').reply(200, tactics.map(tactic => omit(tactic, ['teams'])));

  mock.onGet(/\/tactics\/\d+/).reply((config) => {
    const id = +config.url.split('/').pop();
    const tactic = tactics.filter(t => t.id === id).shift();
    if (!tactic) {
      return [404, []];
    }
    return [200, pick(tactic, ['id', 'teams'])];
  });

  mock.onPost('/tactics').reply(() => [201, { id: getNextIdForEntity('tactics') }]);
};

export default mockApi;
