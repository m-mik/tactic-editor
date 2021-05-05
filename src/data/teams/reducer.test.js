import reducer, { byId } from './reducer';
import { ADD_TEAM_STAT, REMOVE_TEAM_STAT, UPDATE_TEAM_STAT } from './constants';

describe('byId reducer', () => {
  const initialState = {};

  const state = {
    7: {
      id: 7,
      yellowCards: [
        { id: 'af3CHr0Z3TsdgiasqzyVs-', minute: 15, playerId: 6 },
        { id: 'zcxz0zd34c3TsdgGF33sx', minute: 31, playerId: 12 },
      ],
    },
    8: {
      id: 8,
      yellowCards: [],
    },
  };

  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_TEAM_STAT', () => {
    expect(byId(state, {
      type: ADD_TEAM_STAT,
      payload: {
        teamId: 8,
        statData: {
          id: 'jmnCHr0ZAT9imyFqDyVs-',
          playerId: 145,
          minute: 45,
        },
        statName: 'yellowCards',
      },
    })).toEqual({
      7: {
        id: 7,
        yellowCards: [
          { id: 'af3CHr0Z3TsdgiasqzyVs-', minute: 15, playerId: 6 },
          { id: 'zcxz0zd34c3TsdgGF33sx', minute: 31, playerId: 12 },
        ],
      },
      8: { id: 8, yellowCards: [{ id: 'jmnCHr0ZAT9imyFqDyVs-', minute: 45, playerId: 145 }] },
    });

    expect(byId(state, {
      type: ADD_TEAM_STAT,
      payload: {
        teamId: 7,
        statData: {
          id: 'jmnCHr0ZAT9imyFqDyVs',
          playerId: 145,
          minute: 45,
        },
        statName: 'yellowCards',
      },
    })).toEqual({
      7: {
        id: 7,
        yellowCards: [
            { id: 'af3CHr0Z3TsdgiasqzyVs-', minute: 15, playerId: 6 },
            { id: 'zcxz0zd34c3TsdgGF33sx', minute: 31, playerId: 12 },
            { id: 'jmnCHr0ZAT9imyFqDyVs', minute: 45, playerId: 145 },
        ],
      },
      8: { id: 8, yellowCards: [] },
    });
  });

  it('should handle REMOVE_TEAM_STAT', () => {
    expect(byId(state, {
      type: REMOVE_TEAM_STAT,
      payload: {
        teamId: 7,
        statName: 'yellowCards',
        statId: 'af3CHr0Z3TsdgiasqzyVs-',
      },
    })).toEqual({
      7: { id: 7, yellowCards: [{ id: 'zcxz0zd34c3TsdgGF33sx', minute: 31, playerId: 12 }] },
      8: { id: 8, yellowCards: [] },
    });
  });

  it('should handle UPDATE_TEAM_STAT', () => {
    expect(byId(state, {
      type: UPDATE_TEAM_STAT,
      payload: {
        teamId: 7,
        statName: 'yellowCards',
        statId: 'af3CHr0Z3TsdgiasqzyVs-',
        statData: {
          minute: 68,
        },
      },
    })).toEqual({
      7: {
        id: 7,
        yellowCards: [
          { id: 'af3CHr0Z3TsdgiasqzyVs-', minute: 68, playerId: 6 },
          { id: 'zcxz0zd34c3TsdgGF33sx', minute: 31, playerId: 12 },
        ],
      },
      8: { id: 8, yellowCards: [] },
    });
  });

  it('should merge team entities when they exist in action payload', () => {
    expect(byId({
      1: { id: 1, name: 'Team 1' },
      2: { id: 2, name: 'Team 2' },
    }, {
      payload: {
        entities: {
          teams: {
            2: {
              id: 2,
              name: 'Team 2 New Name',
            },
          },
        },
        result: 2,
      },
    })).toEqual({
      1: { id: 1, name: 'Team 1' },
      2: { id: 2, name: 'Team 2 New Name' },
    });
  });
});

describe('teams reducer', () => {
  const initialState = { byId: {} };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
