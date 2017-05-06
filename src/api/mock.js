import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import tactics from './tactics.json';

const mock = new MockAdapter(axios, { delayResponse: 1000 });

mock.onGet('/tactics').reply(200, { tactics });

mock.onPost('/tactics').reply(config => [201, config.data]);
