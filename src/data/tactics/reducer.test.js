import reducer, { status, byId, items } from './reducer';
import {
  CREATE_TACTIC_FULFILLED,
  CREATE_TACTIC_PENDING,
  CREATE_TACTIC_REJECTED,
  DELETE_TACTIC_FULFILLED,
  DELETE_TACTIC_PENDING,
  DELETE_TACTIC_REJECTED,
  FETCH_TACTICS_FULFILLED,
  FETCH_TACTICS_PENDING,
  FETCH_TACTICS_REJECTED,
} from './constants';

describe('status reducer', () => {
  const initialState = {
    isFetching: false,
    isCreating: false,
    isDeleting: false,
    error: false,
  };

  it('should return the initial state', () => {
    expect(status(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TACTICS_PENDING', () => {
    expect(status(initialState, { type: FETCH_TACTICS_PENDING }))
      .toEqual({ ...initialState, isFetching: true });
  });

  it('should handle FETCH_TACTICS_REJECTED', () => {
    expect(status({ ...initialState, isFetching: true }, { type: FETCH_TACTICS_REJECTED }))
    .toEqual({ ...initialState, error: true });
  });

  it('should handle FETCH_TACTICS_FULFILLED', () => {
    expect(status(
      { ...initialState, isFetching: true },
      { type: FETCH_TACTICS_FULFILLED, payload: { result: [3, 7] } },
    )).toEqual({ ...initialState, isFetching: false });
  });

  it('should handle CREATE_TACTIC_PENDING', () => {
    expect(status(initialState, { type: CREATE_TACTIC_PENDING }))
      .toEqual({ ...initialState, isCreating: true });
  });

  it('should handle CREATE_TACTIC_REJECTED', () => {
    expect(status(
      { ...initialState, isCreating: true },
      { type: CREATE_TACTIC_REJECTED },
    )).toEqual({ ...initialState, error: true });
  });

  it('should handle CREATE_TACTIC_FULFILLED', () => {
    expect(status(
      { ...initialState, isCreating: true },
      { type: CREATE_TACTIC_FULFILLED, payload: { data: { id: 4, name: 'Tactic' } } },
    )).toEqual({ ...initialState, isCreating: false });
  });

  it('should handle DELETE_TACTIC_PENDING', () => {
    expect(status(initialState, { type: DELETE_TACTIC_PENDING }))
      .toEqual({ ...initialState, isDeleting: true });
  });

  it('should handle DELETE_TACTIC_REJECTED', () => {
    expect(status({ ...initialState, isDeleting: true }, { type: DELETE_TACTIC_REJECTED }))
      .toEqual({ ...initialState, error: true, isDeleting: false });
  });

  it('should handle DELETE_TACTIC_FULFILLED', () => {
    expect(status(
      { ...initialState, isDeleting: true },
      { type: DELETE_TACTIC_FULFILLED, meta: { id: 2 } },
    )).toEqual({ ...initialState, isDeleting: false });
  });
});

describe('byId reducer', () => {
  const initialState = {};

  it('should return the initial state', () => {
    expect(byId(undefined, {})).toEqual(initialState);
  });

  it('should handle CREATE_TACTIC_FULFILLED', () => {
    expect(byId(
      initialState,
      { type: CREATE_TACTIC_FULFILLED, payload: { data: { id: 4, name: 'Tactic' } } },
    )).toEqual({ 4: { id: 4, name: 'Tactic' } });
  });

  it('should merge tactic entities when they exist in action payload', () => {
    expect(byId(
      { 1: { id: 1, name: 'Barcelona' }, 2: { id: 2, name: 'Real Madrid' } },
      { payload: { entities: { tactics: { 1: { name: 'Atletico Madrid' } } } } },
    )).toEqual({ 1: { id: 1, name: 'Atletico Madrid' }, 2: { id: 2, name: 'Real Madrid' } });
  });
});

describe('items reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(items(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TACTICS_FULFILLED', () => {
    expect(items([1, 5], { type: FETCH_TACTICS_FULFILLED, payload: { result: [3, 7] } }))
      .toEqual([1, 5, 3, 7]);
  });

  it('should handle CREATE_TACTIC_FULFILLED', () => {
    expect(items(
      [6, 2],
      { type: CREATE_TACTIC_FULFILLED, payload: { data: { id: 4, name: 'Tactic' } } },
    )).toEqual([4, 6, 2]);
  });

  it('should handle DELETE_TACTIC_FULFILLED', () => {
    expect(items([6, 2], { type: DELETE_TACTIC_FULFILLED, meta: { id: 2 } })).toEqual([6]);
  });
});

describe('tactics reducer', () => {
  const initialState = {
    byId: {},
    items: [],
    status: { error: false, isCreating: false, isDeleting: false, isFetching: false },
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
