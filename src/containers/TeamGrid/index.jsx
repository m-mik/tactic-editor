import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import Tile from './Tile';
import PlayerDragLayer from './PlayerDragLayer';
import styles from './TeamGrid.scss';

const TeamGrid = (props) => {
  const { team, tilesCount, type, onMovePlayer, onSwapPlayers } = props;

  const renderTile = (position, player, shirt) => (
    <Tile
      key={position}
      position={position}
      player={player}
      shirt={shirt}
      onMovePlayerTransitionEnd={onMovePlayer}
      onSwapPlayers={onSwapPlayers}
    />
  );

  const renderTiles = () => times(tilesCount).map((index) => {
    const position = type === 'home' ? index : (tilesCount - index - 1);
    const player = team.players[position];
    return renderTile(position, player, team.shirt);
  });

  return (
    <div className={styles.wrapper}>
      {renderTiles()}
      <PlayerDragLayer />
    </div>
  );
};

TeamGrid.defaultProps = {
  onMovePlayer: () => {},
};

TeamGrid.propTypes = {
  team: PropTypes.shape({
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  tilesCount: PropTypes.number.isRequired,
  onMovePlayer: PropTypes.func,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(TeamGrid);
