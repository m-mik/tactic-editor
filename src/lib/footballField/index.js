import { findDOMNode } from 'react-dom';

export const TEAM_GRID_ID_PREFIX = 'team-grid';
export const TILES_COUNT = 36;
export const TILES_PER_LINE = (TILES_COUNT - 1) / 5;

export const findTeamGrid = (teamId) => {
  const teamGridId = `#${TEAM_GRID_ID_PREFIX}-${teamId}`;
  const teamGridEl = document.querySelector(teamGridId);
  if (!teamGridEl) throw new Error(`Couldn't find ${teamGridId}`);
  const teamGridType = teamGridEl.dataset.gridType;

  return {
    getTileIndexForPos(position) {
      const tileNodes = teamGridEl.children;
      switch (teamGridType) {
        case 'home':
          return position;
        case 'away':
          return tileNodes.length - position - 1;
        default:
          throw new Error(`Invalid data-grid-type attribute on TeamGrid: ${teamGridType} 
            (home/away allowed)`);
      }
    },

    getTileElement(position) {
      const index = this.getTileIndexForPos(position);
      const tileEl = teamGridEl.children[index];
      if (!tileEl) throw new Error(`Invalid tile position: ${position}`);
      return tileEl;
    },

    getTileCoords(position) {
      const element = this.getTileElement(position);
      return element.getBoundingClientRect();
    },

    findTileOffsets(tilePositions) {
      return tilePositions.reduce((result, pos) => {
        const { from, to } = pos;
        const fromCoords = this.getTileCoords(from);
        const toCoords = this.getTileCoords(to);
        const offset = {
          left: fromCoords.left - toCoords.left,
          top: fromCoords.top - toCoords.top,
        };
        const posWithOffset = {
          [from]: { [to]: offset },
        };
        return { ...result, ...posWithOffset };
      }, {});
    },

    findTileOffset(tilePosition) {
      const offsets = this.findTileOffsets([tilePosition]);
      return offsets[tilePosition.from][tilePosition.to];
    },
  };
};

export const getNodeOffset = (sourceNode, targetNode) => ({
  left: targetNode.offsetLeft - sourceNode.offsetLeft,
  top: targetNode.offsetTop - sourceNode.offsetTop,
});

export const getCompOffset = (sourceComp, targetComp) =>
  getNodeOffset(findDOMNode(sourceComp), findDOMNode(targetComp));

export const getTeamForPlayer = (denormalizedTeams, player) =>
  denormalizedTeams.find((team) => {
    const playerMatch = team.players[player.position];
    if (!playerMatch) return false;
    return playerMatch.id === player.id;
  });

export const findPlayerElement = (denormalizedTeams, player) => {
  const team = getTeamForPlayer(denormalizedTeams, player);
  if (!team) return null;
  return findTeamGrid(team.id).getTileElement(player.position);
};

export const canDropPlayer = (draggedPlayer, target) => {
  const sameTeam = draggedPlayer.team.id === target.team.id;
  const isNewPosition = draggedPlayer.position !== target.position;
  return sameTeam && isNewPosition;
};

export const getFormation = players =>
  Object.keys(players).reduce((result, pos) => {
    if (Number(pos) === 0) return result;
    const line = Math.ceil(pos / TILES_PER_LINE);
    const currentCount = result[line] || 0;
    const newLine = { [line]: currentCount + 1 };
    return { ...result, ...newLine };
  }, {});

export const getFormationText = formation =>
  Object.keys(formation).map(key => formation[key]).join('-');
