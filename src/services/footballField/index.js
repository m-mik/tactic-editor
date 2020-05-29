import { findDOMNode } from 'react-dom';

export const TEAM_GRID_ID_PREFIX = 'team-grid';

export const getNodeOffset = (sourceNode, targetNode) => ({
  left: targetNode.offsetLeft - sourceNode.offsetLeft,
  top: targetNode.offsetTop - sourceNode.offsetTop,
});

export const getCompOffset = (sourceComp, targetComp) =>
  getNodeOffset(findDOMNode(sourceComp), findDOMNode(targetComp));

export const canDropPlayer = (draggedPlayer, target) => {
  const sameTeam = draggedPlayer.team.id === target.team.id;
  const isNewPosition = draggedPlayer.position !== target.position;
  return sameTeam && isNewPosition;
};

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
      const element = teamGridEl.children[index];
      if (!element) throw new Error(`Invalid tile position: ${position}`);
      return element;
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
