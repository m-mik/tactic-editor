import {
  canDropPlayer,
  changeTeamPlayersPos,
  findFirstAvailableBenchPos,
  getFormation,
  getFormationArray,
  getFormationText,
  getTeamForPlayer,
  isBenchPlayer,
  isFieldPlayer,
  matchScore,
} from './index';

describe('footballField tests', () => {
  describe('isBenchPlayer', () => {
    it('should return true if the player is on the bench', () => {
      expect(isBenchPlayer({ position: 36 })).toEqual(true);
      expect(isBenchPlayer({ position: -1 })).toEqual(false);
      expect(isBenchPlayer({ position: 5 })).toEqual(false);
    });
  });

  describe('isFieldPlayer', () => {
    it('should return true if the player is on the field', () => {
      expect(isFieldPlayer({ position: 0 })).toEqual(true);
      expect(isFieldPlayer({ position: 1 })).toEqual(true);
      expect(isFieldPlayer({ position: 13 })).toEqual(true);
      expect(isFieldPlayer({ position: -1 })).toEqual(false);
      expect(isFieldPlayer({ position: 36 })).toEqual(false);
      expect(isFieldPlayer({ position: 37 })).toEqual(false);
    });
  });

  describe('getTeamForPlayer', () => {
    const team1 = {
      id: 1,
      name: 'Team 1',
      players: [
        { id: 1, name: 'Player', number: 1, position: 0, rating: 5 },
        { id: 2, name: 'Player', number: 2, position: 1, rating: 5 },
      ],
    };

    const team2 = {
      id: 1,
      name: 'Team 2',
      players: [
        { id: 3, name: 'Player', number: 1, position: 0, rating: 5 },
        { id: 4, name: 'Player', number: 2, position: 1, rating: 5 },
      ],
    };

    const denormalizedTeams = [team1, team2];
    const player = { id: 4, name: 'Player', number: 2, position: 1, rating: 5 };

    it('should return the correct team for the specified player', () => {
      expect(getTeamForPlayer(denormalizedTeams, player)).toEqual(team2);
    });
  });

  describe('canDropPlayer', () => {
    it('should return false if the dragged player is a goalkeeper and the target ' +
      'is an empty position on the field', () => {
      const draggedPlayer = { position: 0, team: { id: 2 } };
      const target = { position: 2, team: { id: 2 }, player: undefined };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(false);
    });

    it('should return false if the dragged player is a bench player and the target ' +
      'is an empty position on the field', () => {
      const draggedPlayer = { position: 36, team: { id: 2 } };
      const target = { position: 2, team: { id: 2 }, player: undefined };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(false);
    });

    it('should return false if the dragged player and the target are on opposite teams', () => {
      const draggedPlayer = { position: 12, team: { id: 2 } };
      const target = { position: 10, team: { id: 1 }, player: undefined };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(false);
    });

    it('should return false if the dragged player position is the same as the target position', () => {
      const draggedPlayer = { position: 12, team: { id: 2 } };
      const target = { position: 12, team: { id: 2 }, player: undefined };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(false);
    });

    it('should allow to drop a player on an empty tile', () => {
      const draggedPlayer = { position: 12, team: { id: 2 } };
      const target = { position: 13, team: { id: 2 }, player: undefined };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(true);
    });

    it('should allow to drop a player on a tile that contains another player from the same team', () => {
      const draggedPlayer = { position: 12, team: { id: 2 } };
      const target = { id: 1, name: 'Player', position: 14, team: { id: 2 } };
      expect(canDropPlayer(draggedPlayer, target)).toEqual(true);
    });
  });

  describe('getFormation', () => {
    it('should return the correct formation', () => {
      const players = {
        0: { id: 1, name: 'Player 1', number: 1, position: 0, rating: 5 },
        1: { id: 2, name: 'Player 2', number: 2, position: 1, rating: 5 },
        3: { id: 3, name: 'Player 3', number: 3, position: 3, rating: 5 },
        5: { id: 4, name: 'Player 4', number: 4, position: 5, rating: 5 },
        7: { id: 5, name: 'Player 5', number: 5, position: 7, rating: 5 },
        15: { id: 6, name: 'Player 6', number: 6, position: 15, rating: 5 },
        17: { id: 7, name: 'Player 7', number: 7, position: 17, rating: 5 },
        19: { id: 8, name: 'Player 8', number: 8, position: 19, rating: 5 },
        21: { id: 9, name: 'Player 9', number: 9, position: 21, rating: 5 },
        31: { id: 10, name: 'Player 10', number: 10, position: 31, rating: 5 },
        33: { id: 11, name: 'Player 11', number: 11, position: 33, rating: 5 },
      };
      expect(getFormation(players)).toEqual({ 1: 4, 3: 4, 5: 2 });
    });
  });

  describe('getFormationText', () => {
    it('should return the correct formation text', () => {
      expect(getFormationText({ 1: 4, 3: 4, 5: 2 })).toEqual('4-4-2');
      expect(getFormationText({ 1: 4, 2: 1, 3: 3, 5: 2 })).toEqual('4-1-3-2');
    });
  });

  describe('getFormationArray', () => {
    const players = [
      { id: 201, name: 'Player 1', number: 1, position: 2, rating: 5 },
      { id: 202, name: 'Player 2', number: 2, position: 0, rating: 5 },
      { id: 203, name: 'Player 3', number: 6, position: 7, rating: 5 },
    ];
    it('should return the correct formation array', () => {
      expect(getFormationArray(players)).toEqual([2, 0, 7]);
    });
  });

  describe('findFirstAvailableBenchPos', () => {
    it('should return the first available bench position', () => {
      expect(findFirstAvailableBenchPos([1])).toEqual(36);
      expect(findFirstAvailableBenchPos([36, 37])).toEqual(38);
      expect(findFirstAvailableBenchPos([36, 38, 39])).toEqual(37);
      expect(findFirstAvailableBenchPos([36, 39])).toEqual(37);
    });
  });

  describe('matchScore', () => {
    const team1 = { goals: [{ ownGoal: false }, { ownGoal: true }] };
    const team2 = { goals: [{ ownGoal: false }] };

    it('should return [0, 0] if one or more teams were not provided', () => {
      expect(matchScore(team1)).toEqual([0, 0]);
    });

    it('should return the correct match score', () => {
      expect(matchScore(team1, team2)).toEqual([1, 2]);
    });
  });

  describe('changeTeamPlayerPos', () => {
    const team = {
      id: 9,
      name: 'Team',
      players: [
        { id: 158, name: 'Player 1', number: 1, position: 0, rating: 5 },
        { id: 159, name: 'Player 2', number: 2, position: 1, rating: 5 },
      ],
      goals: [],
      yellowCards: [],
      redCards: [],
      substitutions: [],
      shirt: {
        border: { color: '#5b5b5b', style: 'solid' },
        backgroundColor: '#fff',
        textColor: '#130d00',
      },
    };

    it('should change all player positions when no filter was specified', () => {
      const expectedTeam = {
        ...team,
        players: [
          { id: 158, name: 'Player 1', number: 1, position: 10, rating: 5 },
          { id: 159, name: 'Player 2', number: 2, position: 10, rating: 5 },
        ],
      };
      expect(changeTeamPlayersPos(team, 10)).toEqual(expectedTeam);
    });

    it('should change positions only for players who meet the filter condition', () => {
      const expectedTeam = {
        ...team,
        players: [
          { id: 158, name: 'Player 1', number: 1, position: 0, rating: 5 },
          { id: 159, name: 'Player 2', number: 2, position: 10, rating: 5 },
        ],
      };
      const playerFilter = player => player.number === 2;
      expect(changeTeamPlayersPos(team, 10, playerFilter)).toEqual(expectedTeam);
    });
  });
});
