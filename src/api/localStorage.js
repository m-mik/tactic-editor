/* eslint-disable no-console */

const TACTICS_KEY = 'tactics';
const LAST_VISIT_KEY = 'last_visit';

export const loadTactics = () => {
  try {
    const data = localStorage.getItem(TACTICS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error(`Couldn't load tactics from localStorage: ' ${e}`);
  }
  return [];
};

export const loadTactic = (id) => {
  const tactics = loadTactics();
  return tactics.find(tactic => tactic.id === id);
};

export const saveTactic = (tactic) => {
  const tactics = loadTactics();
  try {
    const tacticExists = !!tactics.find(t => t.id === tactic.id);
    const newTactics = tacticExists
      ? tactics.map(t => (t.id === tactic.id ? tactic : t))
      : [...tactics, tactic];
    localStorage.setItem(TACTICS_KEY, JSON.stringify(newTactics));
  } catch (e) {
    console.error(`Couldn't save tactic "${tactic.name}" to localStorage: ' ${e}`);
  }
};

export const saveTactics = (tactics) => {
  try {
    localStorage.setItem(TACTICS_KEY, JSON.stringify(tactics));
  } catch (e) {
    console.error(`Couldn't save tactics to localStorage: ' ${e}`);
  }
};

export const deleteTactic = (id) => {
  const tactics = loadTactics();
  saveTactics(tactics.filter(tactic => tactic.id !== id));
};

export const isNewUser = () => localStorage.getItem(LAST_VISIT_KEY) === null;
export const setLastVisit = () => localStorage.setItem(LAST_VISIT_KEY, String(Date.now()));
