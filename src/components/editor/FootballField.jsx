import React from 'react';
import Tile from './Tile';

const FootballField = () => {
  const tiles = [...new Array(35).keys()];

  const renderTiles = () => tiles.map(index =>
    <Tile key={index} />,
  );

  return (
    <div className="football-field">
      <div className="football-field__tiles">
        <Tile fullWidth />
        {renderTiles()}
        <Tile fullWidth />
      </div>
    </div>
  );
};


export default FootballField;
