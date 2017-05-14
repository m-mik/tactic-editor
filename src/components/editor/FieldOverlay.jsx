import React, { Component } from 'react';
import times from 'lodash/times';
import classNames from 'classnames';

export default class FieldOverlay extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const renderPenaltyBox = (index) => {
      const className = classNames({
        'football-field__penalty-box': true,
        'football-field__penalty-box--home': index === 0,
        'football-field__penalty-box--away': index === 1,
      });

      return (
        <div key={index} className={className}>
          <div className="football-field__penalty-box-rect" />
          <div className="football-field__penalty-box-half-circle" />
          <div className="football-field__penalty-box-dot" />
        </div>
      );
    };

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
