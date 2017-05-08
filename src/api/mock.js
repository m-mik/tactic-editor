import axios from 'axios';
import omit from 'lodash/omit';
import MockAdapter from 'axios-mock-adapter';
import tactics from './tactics.json';

const mockApi = (store) => {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  const getNextIdForEntity = (entityName) => {
    const state = store.getState();
    const items = state.entities[entityName].items;
    return Math.max(...items) + 1;
  };

  mock.onGet('/tactics').reply(200, tactics.map(tactic => omit(tactic, ['teams'])));

  mock.onPost('/tactics').reply(() => [201, { id: getNextIdForEntity('tactics') }]);
};

export default mockApi;
