import reducer from './reducer';
import {
  ADD_PLAYER_TRANSITIONS,
  ADD_UNSAVED_TACTIC,
  CLOSE_CREATE_TACTIC_DIALOG,
  CLOSE_DELETE_TACTIC_DIALOG,
  CLOSE_EDIT_TEAM_DIALOG,
  OPEN_CREATE_TACTIC_DIALOG,
  OPEN_DELETE_TACTIC_DIALOG,
  OPEN_EDIT_TEAM_DIALOG,
  REMOVE_PLAYER_TRANSITIONS,
  REMOVE_UNSAVED_TACTIC,
  SELECT_PLAYER,
  SELECT_TACTIC,
  SET_PLAYERS_TO_REPLACE,
} from './constants';
import {
  SAVE_TACTIC_FULFILLED,
  SAVE_TACTIC_PENDING,
  SAVE_TACTIC_REJECTED,
} from '../../data/tactics/constants';

describe('TacticPage reducer', () => {
  const initialState = {
    activeTacticId: 0,
    activePlayerId: 0,
    editedTeamId: 0,
    unsavedTacticIds: new Set(),
    playersToReplace: null,
    playerTransitions: {},
    isCreateTacticDialogOpen: false,
    isDeleteTacticDialogOpen: false,
    isSavingTactic: false,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SELECT_TACTIC', () => {
    expect(reducer(initialState, { type: SELECT_TACTIC, id: 4 }))
      .toEqual({ ...initialState, activeTacticId: 4 });
  });

  it('should handle ADD_PLAYER_TRANSITIONS', () => {
    expect(reducer(initialState, {
      type: ADD_PLAYER_TRANSITIONS,
      payload: {
        124: {
          left: -97.609375,
          top: 0,
        },
        125: {
          left: -27.609375,
          top: 0,
        },
      },
    })).toEqual({
      ...initialState,
      playerTransitions: {
        124: {
          left: -97.609375,
          top: 0,
        },
        125: {
          left: -27.609375,
          top: 0,
        },
      },
    });
  });

  it('should handle REMOVE_PLAYER_TRANSITIONS', () => {
    expect(reducer({
      ...initialState,
      playerTransitions: {
        124: { left: -97.609375, top: 0 },
        125: { left: -27.609375, top: 0 },
        126: { left: 27.609375, top: 27.6093750 },
      },
    }, {
      type: REMOVE_PLAYER_TRANSITIONS,
      payload: [124, 126],
    })).toEqual({ ...initialState, playerTransitions: { 125: { left: -27.609375, top: 0 } } });
  });

  it('should handle SELECT_PLAYER', () => {
    expect(reducer(initialState, { type: SELECT_PLAYER, payload: 4 }))
      .toEqual({ ...initialState, activePlayerId: 4 });
  });

  it('should handle SET_PLAYERS_TO_REPLACE', () => {
    expect(reducer(initialState, {
      type: SET_PLAYERS_TO_REPLACE,
      payload: { p1: { id: 1, name: 'Player 1' }, p2: { id: 2, name: 'Player 2' } },
    })).toEqual({
      ...initialState,
      playersToReplace: { p1: { id: 1, name: 'Player 1' }, p2: { id: 2, name: 'Player 2' } },
    });
  });

  it('should handle OPEN_EDIT_TEAM_DIALOG', () => {
    expect(reducer(initialState, { type: OPEN_EDIT_TEAM_DIALOG, payload: 7 }))
      .toEqual({ ...initialState, editedTeamId: 7 });
  });

  it('should handle CLOSE_EDIT_TEAM_DIALOG', () => {
    expect(reducer({ ...initialState, editedTeamId: 1 }, { type: CLOSE_EDIT_TEAM_DIALOG }))
      .toEqual({ ...initialState, editedTeamId: 0 });
  });

  it('should handle OPEN_CREATE_TACTIC_DIALOG', () => {
    expect(reducer(initialState, { type: OPEN_CREATE_TACTIC_DIALOG }))
      .toEqual({ ...initialState, isCreateTacticDialogOpen: true });
  });

  it('should handle CLOSE_CREATE_TACTIC_DIALOG', () => {
    expect(reducer({
      ...initialState,
      isCreateTacticDialogOpen: true,
    }, { type: CLOSE_CREATE_TACTIC_DIALOG })).toEqual({
      ...initialState,
      isCreateTacticDialogOpen: false,
    });
  });

  it('should handle OPEN_DELETE_TACTIC_DIALOG', () => {
    expect(reducer(initialState, { type: OPEN_DELETE_TACTIC_DIALOG }))
      .toEqual({ ...initialState, isDeleteTacticDialogOpen: true });
  });

  it('should handle CLOSE_DELETE_TACTIC_DIALOG', () => {
    expect(reducer({
      ...initialState,
      isDeleteTacticDialogOpen: true,
    }, { type: CLOSE_DELETE_TACTIC_DIALOG })).toEqual({
      ...initialState,
      isDeleteTacticDialogOpen: false,
    });
  });

  it('should handle ADD_UNSAVED_TACTIC', () => {
    expect(reducer({
      ...initialState,
      unsavedTacticIds: new Set([1, 2]),
    }, { type: ADD_UNSAVED_TACTIC, payload: 4 }))
      .toEqual({ ...initialState, unsavedTacticIds: new Set([1, 2, 4]) });

    expect(reducer({
      ...initialState,
      unsavedTacticIds: new Set([1, 2]),
    }, { type: ADD_UNSAVED_TACTIC, payload: 2 }))
      .toEqual({ ...initialState, unsavedTacticIds: new Set([1, 2]) });
  });

  it('should handle REMOVE_UNSAVED_TACTIC', () => {
    expect(reducer(
      { ...initialState, unsavedTacticIds: new Set([1, 2]) },
      { type: REMOVE_UNSAVED_TACTIC, payload: 2 },
    )).toEqual({ ...initialState, unsavedTacticIds: new Set([1]) });
  });

  it('should handle SAVE_TACTIC_PENDING', () => {
    expect(reducer(initialState, { type: SAVE_TACTIC_PENDING })).toEqual({
      ...initialState,
      isSavingTactic: true,
    });
  });

  it('should handle SAVE_TACTIC_FULFILLED', () => {
    expect(reducer({ ...initialState, isSavingTactic: true }, { type: SAVE_TACTIC_FULFILLED }))
      .toEqual({ ...initialState, isSavingTactic: false });
  });


  it('should handle SAVE_TACTIC_REJECTED', () => {
    expect(reducer({ ...initialState, isSavingTactic: true }, { type: SAVE_TACTIC_REJECTED }))
      .toEqual({ ...initialState, isSavingTactic: false });
  });
});
