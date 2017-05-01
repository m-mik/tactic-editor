import tactics from './tactics.json';

const TIMEOUT = 1000;

const delay = (ms = TIMEOUT) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTactics = () => delay(1000).then(() => tactics);
