import reducer, { fetching, errors, byId } from './reducer';
import { CREATE_TACTIC_FULFILLED } from '../tactics/constants';
import {
  FETCH_TACTIC_DETAIL_FULFILLED,
  FETCH_TACTIC_DETAIL_PENDING,
  FETCH_TACTIC_DETAIL_REJECTED,
} from './constants';

describe('fetching reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(fetching(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TACTIC_DETAIL_REJECTED', () => {
    expect(fetching(
      [3, 5],
      { type: FETCH_TACTIC_DETAIL_REJECTED, meta: { data: { id: 3 } } },
    )).toEqual([5]);
  });

  it('should handle FETCH_TACTIC_DETAIL_FULFILLED', () => {
    expect(fetching(
      [1, 2, 3, 5],
      { type: FETCH_TACTIC_DETAIL_FULFILLED, payload: { result: 3 } },
    )).toEqual([1, 2, 5]);
  });

  it('should handle FETCH_TACTIC_DETAIL_PENDING', () => {
    expect(fetching(
      [1],
      { type: FETCH_TACTIC_DETAIL_PENDING, meta: { data: { id: 3 } } },
    )).toEqual([1, 3]);
  });
});

describe('errors reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(errors(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TACTIC_DETAIL_REJECTED', () => {
    expect(errors(
      initialState,
      { type: FETCH_TACTIC_DETAIL_REJECTED, meta: { data: { id: 3 } } },
    )).toEqual([3]);
  });

  it('should handle FETCH_TACTIC_DETAIL_FULFILLED', () => {
    expect(errors(
      [3],
      { type: FETCH_TACTIC_DETAIL_FULFILLED, payload: { result: 3 } },
      )).toEqual([]);
  });

  it('should handle FETCH_TACTIC_DETAIL_PENDING', () => {
    expect(errors(
      [3],
      { type: FETCH_TACTIC_DETAIL_PENDING, meta: { data: { id: 3 } } },
      )).toEqual([]);
  });

  it('should handle CREATE_TACTIC_FULFILLED', () => {
    expect(errors(
      [3],
      { type: CREATE_TACTIC_FULFILLED },
    )).toEqual([]);
  });
});

describe('byId reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_TACTIC_FULFILLED', () => {
    const action = {
      type: CREATE_TACTIC_FULFILLED,
      payload: {
        status: 201,
        data: {
          id: 5,
          name: 'Tactic name',
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
          teams: [{ id: 7 }, { id: 8 }],
        },
      },
    };
    const expectedState = {
      5: {
        id: 5,
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
        teams: [7, 8],
      },
    };
    expect(byId(initialState, action)).toEqual(expectedState);
  });

  it('should merge tacticDetail entities when they exist in action payload', () => {
    expect(byId(
      { 5: { id: 5, options: { showGrid: false, showNames: true }, teams: [1, 2] } },
      { payload: { entities: { tacticDetails: {
        5: { options: { showGrid: true } },
      } } } },
    )).toEqual({
      5: { id: 5, options: { showGrid: true, showNames: true }, teams: [1, 2] },
    });
  });
});

describe('tacticDetails reducer', () => {
  const initialState = { byId: {}, status: { fetching: [], errors: [] } };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
