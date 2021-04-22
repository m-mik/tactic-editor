import React, { Component } from 'react';
import times from 'lodash/times';
import classNames from 'classnames';
import styles from './Overlay.scss';

export default class Overlay extends Component {
  static renderPenaltyBoxes() {
    return times(2, (index) => {
      const className = classNames({
        [styles.homePenaltyBox]: index === 0,
        [styles.awayPenaltyBox]: index === 1,
      });
      return (
        <div key={index} className={className}>
          <div className={styles.rect} />
          <div className={styles.circle} />
          <div className={styles.dot} />
        </div>
      );
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.middleLine} />
        <div className={styles.middleCircle} />
        <div className={styles.corners}>
          {times(4, index => <div key={index} />)}
        </div>
        <div className={styles.goals} >
          {times(2, index => <div key={index} />)}
        </div>
        <div>
          {Overlay.renderPenaltyBoxes()}
        </div>
      </div>
    );
  }
}
