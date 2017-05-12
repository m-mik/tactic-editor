import React from 'react';
import Tile from './Tile';

const FootballField = () => {
  const tiles = [...new Array(35).keys()];

  const renderTiles = () => tiles.map(index =>
    <Tile key={index} />,
  );

  const renderOverlay = () => (
    <div className="football-field__overlay">
      <div className="football-field__middle-line" />
      <div className="football-field__middle-circle" />
      <div className="football-field__corners">
        {[...new Array(4).keys()].map(index => <div key={index} />)}
      </div>
    </div>
  );

  return (
    <div className="football-field">
      {renderOverlay()}
      <div className="football-field__tiles">
        <Tile fullWidth />
        {renderTiles()}
        <Tile fullWidth />
      </div>
    </div>
  );
};


export default FootballField;
