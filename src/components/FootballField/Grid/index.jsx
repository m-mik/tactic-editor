import React from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';
import Tile from './Tile';
import styles from './Grid.scss';

const Grid = (props) => {
  const { team, tilesCount, home, away } = props;
  const tiles = times(tilesCount);

  const renderTiles = () => tiles.map((index) => {
    const position = home ? index : (tilesCount - index - 1);
    const isFirst = index === 0;
    const isLast = index === tiles.length - 1;
    const fullWidthTile = (home && isFirst) || (away && isLast);
    const tileClass = classNames({
      [styles.fullWidthTile]: fullWidthTile,
    });
    return (<Tile
      key={index}
      player={team.players[position]}
      shirt={team.shirt}
      className={tileClass}
    />);
  });

  return (
    <div className={styles.wrapper}>
      {renderTiles()}
    </div>
  );
};

Grid.defaultProps = {
  home: false,
  away: false,
};

Grid.propTypes = {
  team: PropTypes.shape({
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  tilesCount: PropTypes.number.isRequired,
  home: PropTypes.bool,
  away: PropTypes.bool,
};


export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Grid);
