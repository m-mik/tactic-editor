export const TEAM_GRID_ID_PREFIX = 'team-grid';
export const TILES_COUNT = 36;
export const TILES_PER_LINE = (TILES_COUNT - 1) / 5;
export const INITIAL_FIELD_PLAYER_POS = 18;

export const isOnField = position => position >= 0 && position < TILES_COUNT;
export const isOnBench = position => position >= TILES_COUNT;
export const isBenchPlayer = player => isOnBench(player.position);
export const isFieldPlayer = player => isOnField(player.position);

export function getBenchPosition(playerPos) {
  return (playerPos - TILES_COUNT) + 1;
}

export function findTeamGridElem(teamId) {
  const teamGridId = `#${TEAM_GRID_ID_PREFIX}-${teamId}`;
  return document.querySelector(teamGridId);
}

export function findBenchPlayerElem(teamId, playerPos) {
  const benchPos = getBenchPosition(playerPos);
  return document.querySelector(`#team-${teamId}-bench [data-bench-pos="${benchPos}"]`);
}

export function getTeamGridTileIndexForPos(teamGridEl, position) {
  const tileNodes = teamGridEl.children;
  const teamGridType = teamGridEl.dataset.gridType;
  switch (teamGridType) {
    case 'home':
      return position;
    case 'away':
      return tileNodes.length - position - 1;
    default:
      throw new Error(`Invalid data-grid-type attribute on TeamGrid: ${teamGridType}
            (home/away allowed)`);
  }
}

export function getTeamGridTileElemForPos(teamGridEl, position) {
  const index = getTeamGridTileIndexForPos(teamGridEl, position);
  const tileEl = teamGridEl.children[index];
  if (!tileEl) throw new Error(`Invalid tile position: ${position}`);
  return tileEl;
}

export function getTileCoordsForPos(position, teamId) {
  const element = isOnField(position) ?
    getTeamGridTileElemForPos(findTeamGridElem(teamId), position) :
    findBenchPlayerElem(teamId, position);
  const errorMsg = `Tile for position=${position}, teamId=${teamId} could not be found`;
  if (!element) throw new Error(errorMsg);
  return element.getBoundingClientRect();
}

export function findTileOffsets(tilePositions, teamId) {
  return tilePositions.reduce((result, pos) => {
    const { from, to } = pos;
    const fromCoords = getTileCoordsForPos(from, teamId);
    const toCoords = getTileCoordsForPos(to, teamId);
    const offset = {
      left: fromCoords.left - toCoords.left,
      top: fromCoords.top - toCoords.top,
    };
    const posWithOffset = {
      [from]: { [to]: offset },
    };
    return { ...result, ...posWithOffset };
  }, {});
}

export function findTileOffset(tilePosition, teamId) {
  try {
    const offsets = findTileOffsets([tilePosition], teamId);
    return offsets[tilePosition.from][tilePosition.to];
  } catch (e) {
    return null;
  }
}

export function getTeamForPlayer(denormalizedTeams, player) {
  return denormalizedTeams.find(team =>
    team.players.some(teamPlayer => teamPlayer.id === player.id),
  );
}

export function findPlayerElement(denormalizedTeams, player) {
  const team = getTeamForPlayer(denormalizedTeams, player);
  if (!team) return null;
  return isBenchPlayer(player) ?
    findBenchPlayerElem(team.id, player.position) :
    getTeamGridTileElemForPos(findTeamGridElem(team.id), player.position);
}

export function canDropPlayer(draggedPlayer, target) {
  const isGoalkeeperOnField = isFieldPlayer(draggedPlayer) && draggedPlayer.position === 0;
  const isTargetEmptyTileOnField = isOnField(target.position) && 'player' in target;
  const isTargetNewPosition = draggedPlayer.position !== target.position;
  const isInSameTeam = draggedPlayer.team.id === target.team.id;
  if (isGoalkeeperOnField && isTargetEmptyTileOnField) return false;
  if (isBenchPlayer(draggedPlayer) && isTargetEmptyTileOnField) return false;
  return isInSameTeam && isTargetNewPosition;
}

export function getFormation(players) {
  return Object.keys(players).reduce((result, pos) => {
    if (Number(pos) === 0 || Number(pos) >= TILES_COUNT) return result;
    const line = Math.ceil(pos / TILES_PER_LINE);
    const currentCount = result[line] || 0;
    const newLine = { [line]: currentCount + 1 };
    return { ...result, ...newLine };
  }, {});
}

export function getFormationText(formation) {
  return Object.keys(formation).map(key => formation[key]).join('-');
}

export function getFormationArray(players) {
  return players.filter(isFieldPlayer).map(player => player.position);
}

export function findFirstAvailableBenchPos(positions) {
  const sortedPos = positions.sort((pos1, pos2) => pos1 - pos2);
  for (let i = 0; i < sortedPos.length; i += 1) {
    const pos = sortedPos[i];
    const expectedPos = TILES_COUNT + i;
    if (expectedPos - pos !== 0) return expectedPos;
  }
  return TILES_COUNT + positions.length;
}

export function matchScore(team1, team2) {
  if (!team1 || !team2) return [0, 0];
  const [t1, t2] = [team1, team2]
    .map(team => ({
      goals: team.goals.filter(goal => !goal.ownGoal).length,
      ownGoals: team.goals.filter(goal => goal.ownGoal).length,
    }));
  return [t1.goals + t2.ownGoals, t2.goals + t1.ownGoals];
}

export function changeTeamPlayersPos(team, position, playerFilter) {
  return {
    ...team,
    players: team.players.map(player =>
      (playerFilter && playerFilter(player) ? ({ ...player, position }) : player)),
  };
}
