import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import Tile from './Tile';
import DraggablePlayer from './DraggablePlayer';
import PlayerDragLayer from './PlayerDragLayer';
import styles from './TeamGrid.scss';

const TeamGrid = (props) => {
  const { team, tilesCount, type } = props;
  const isHome = type === 'home';
  const isAway = type === 'away';

  const renderTile = (index, player, shirt, tileClass) => (
    <Tile
      onDropPlayer={() => console.log('drop')}
      key={index}
      shirt={shirt}
      className={tileClass}
    >
      {player && <DraggablePlayer data={player} shirt={shirt} />}
    </Tile>
  );

  const renderTiles = () => times(tilesCount).map((index) => {
    const position = isHome ? index : (tilesCount - index - 1);
    const isFirst = index === 0;
    const isLast = index === tilesCount - 1;
    const fullWidthTile = (isHome && isFirst) || (isAway && isLast);
    const tileClass = classNames({
      [styles.fullWidthTile]: fullWidthTile,
    });
    return renderTile(position, team.players[position], team.shirt, tileClass);
  });

  return (
    <div className={styles.wrapper}>
      {renderTiles()}
      <PlayerDragLayer />
    </div>
  );
};

TeamGrid.propTypes = {
  team: PropTypes.shape({
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  tilesCount: PropTypes.number.isRequired,
};

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(TeamGrid);
