/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Color from 'color';
import times from 'lodash/times';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import AssistIcon from '../AssistIcon';
import styles from './Player.scss';

const cx = classNames.bind(styles);

export default class Player extends Component {
  render() {
    const {
      name, position, number, team, className, rating, cards, assists, goals, ...rest
    } = this.props;
    const { border, backgroundColor, textColor } = team.shirt;
    const isGoalkeeper = position === 0;
    const gkBackgroundColor = Color(backgroundColor).mix(Color('green'), 0.5).rotate(180);
    const playerBg = isGoalkeeper ? gkBackgroundColor : backgroundColor;

    const shirtStyle = {
      background: playerBg,
      backgroundImage: `linear-gradient(to bottom, 
        ${playerBg} 0%, 
        ${Color(playerBg).darken(0.4)} 100%)`,
      borderColor: border.color,
      borderStyle: border.style,
      color: textColor,
    };

    const wrapperClassName = cx(
      { wrapper: true },
      { [className]: !!className },
    );

    const playerRatingClassName = cx(
      { ratingMax: rating === 10 },
      { ratingHigh: rating >= 7 && rating <= 9 },
      { ratingAvg: rating >= 4 && rating <= 6 },
      { ratingLow: rating >= 1 && rating <= 3 },
    );

    return (
      <div className={wrapperClassName} {...rest}>
        <span className={styles.shirt} style={shirtStyle}>{number}</span>
        <span className={styles.name}>{name}</span>
        <span className={playerRatingClassName}>{rating}</span>
        <div className={styles.cards}>
          {times(cards.yellow).map(index =>
            <YellowCardIcon key={index} className={styles.yellowCard} />,
          )}
          {times(cards.red).map(index =>
            <RedCardIcon key={index} className={styles.redCard} />,
          )}
        </div>
        <div className={styles.assists}>
          {times(assists).map(index =>
            <AssistIcon key={index} />,
          )}
        </div>
        <div className={styles.goals}>
          {times(goals).map(index =>
            <GoalIcon key={index} />,
          )}
        </div>
      </div>
    );
  }
}

Player.defaultProps = {
  className: '',
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  cards: PropTypes.shape({
    yellow: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }).isRequired,
  goals: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  team: PropTypes.shape({
    shirt: PropTypes.shape({
      border: PropTypes.object.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  className: PropTypes.string,
};

