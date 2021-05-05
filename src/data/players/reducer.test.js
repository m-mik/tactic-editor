import reducer from './reducer';

describe('players reducer', () => {
  const state = {
    byId: {
      1: {
        id: 1,
        name: 'M. ter Stegen',
        number: 1,
        position: 0,
        rating: 10,
      },
      2: {
        id: 2,
        name: 'S. Roberto',
        number: 20,
        position: 1,
        rating: 5,
      },
    },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ byId: {} });
  });

  it('should return the current state when no entities were specified in action payload', () => {
    const action = {
      type: 'ACTION_TYPE',
      payload: {},
    };
    expect(reducer(state, action)).toEqual(state);
  });

  it('should merge player entities when they exist in action payload', () => {
    const expectedState = {
      byId: {
        1: {
          id: 1,
          name: 'M. ter Stegen',
          number: 1,
          position: 0,
          rating: 10,
        },
        2: {
          id: 2,
          name: 'S. Roberto',
          number: 20,
          position: 13,
          rating: 5,
        },
        3: {
          id: 3,
          name: 'G. Pique',
          number: 3,
          position: 3,
          rating: 7,
        },
      },
    };

    const action = {
      payload: {
        entities: {
          players: {
            2: { id: 2, position: 13 },
            3: {
              id: 3,
              name: 'G. Pique',
              number: 3,
              position: 3,
              rating: 7,
            },
          },
        },
      },
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });
});
