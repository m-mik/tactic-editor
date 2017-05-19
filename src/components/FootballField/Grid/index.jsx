import React from 'react';
import times from 'lodash/times';
import classNames from 'classnames';
import Tile from './Tile';
import styles from './Grid.scss';

const Grid = () => {
  const tiles = times(72);

  const renderTiles = () => tiles.map((index) => {
    const isFirstOrLast = index === 0 || (index === tiles.length - 1);
    const tileClass = classNames({
      [styles.fullWidthTile]: isFirstOrLast,
    });
    return <Tile key={index} className={tileClass} />;
  });

  return (
    <div className={styles.wrapper}>
      {renderTiles()}
    </div>
  );
};

export default Grid;
