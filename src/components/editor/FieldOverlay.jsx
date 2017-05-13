import React, { Component } from 'react';
import times from 'lodash/times';

export default class FieldOverlay extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const renderPenaltyBox = index => (
      <div key={index} className="football-field__penalty-box" >
        <div className="football-field__penalty-box-item-1" />
        <div className="football-field__penalty-box-item-2" />
      </div>
    );

    return (
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
  }
}
