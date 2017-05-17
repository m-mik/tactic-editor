import React from 'react';
import times from 'lodash/times';
import Tile from './Tile';
import Overlay from './Overlay';

const FootballField = () => {
  const tiles = times(72);

  const renderTiles = () => tiles.map((index) => {
    const isFirstOrLast = index === 0 || (index === tiles.length - 1);
    return <Tile key={index} fullWidth={isFirstOrLast} />;
  });

  return (
    <div className="football-field">
      <Overlay />
      <div className="football-field__tiles">
        {renderTiles()}
      </div>
    </div>
  );
};

export default FootballField;
