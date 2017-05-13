import React from 'react';
import times from 'lodash/times';
import Tile from './Tile';

const FootballField = () => {
  const tiles = times(70);

  const renderTiles = () => tiles.map(index =>
    <Tile key={index} />,
  );

  const renderPenaltyBox = index => (
    <div key={index} className="football-field__penalty-box" >
      <div className="football-field__penalty-box-item-1" />
      <div className="football-field__penalty-box-item-2" />
    </div>
  );

  const renderOverlay = () => (
    <div className="football-field__overlay">
      <div className="football-field__middle-line" />
      <div className="football-field__middle-circle" />
      <div className="football-field__corners">
        {times(4, index => <div key={index} />)}
      </div>
      <div className="football-field__goals" >
        {times(2, index => <div key={index} />)}
      </div>
      <div className="football-field__penalty-boxes">
        {times(2, index => renderPenaltyBox(index))}
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
