import React from 'react';
import Tile from './Tile';

const FootballField = () => {
  const tiles = [...new Array(20).keys()];

  const renderTiles = () => tiles.map(index =>
    <Tile key={index} />,
  );

  return (
    <div className="football-field">
      <Tile fullWidth />
      {renderTiles()}
      <Tile fullWidth />
    </div>
  );
};


export default FootballField;
