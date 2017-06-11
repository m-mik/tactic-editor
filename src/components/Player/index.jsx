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
      name,
      position,
      number,
      team,
      className,
      rating,
      cards,
      assists,
      goals,
      showNumber,
      showRating,
      ...rest
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

    const renderRating = () => {
      if (showRating) {
        return <span className={playerRatingClassName}>{rating}</span>;
      }
      return null;
    };

    return (
      <div className={wrapperClassName} {...rest}>
        <span className={styles.shirt} style={shirtStyle}>{showNumber && number}</span>
        <span className={styles.name}>{name}</span>
        {renderRating()}
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
  name: 'Player Name',
  number: 1,
  rating: 0,
  position: -1,
  cards: { yellow: 0, red: 0 },
  goals: 0,
  assists: 0,
  showNumber: true,
  showRating: true,
};

Player.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
  rating: PropTypes.number,
  position: PropTypes.number,
  cards: PropTypes.shape({
    yellow: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }),
  goals: PropTypes.number,
  assists: PropTypes.number,
  team: PropTypes.shape({
    shirt: PropTypes.shape({
      border: PropTypes.object.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  showNumber: PropTypes.bool,
  showRating: PropTypes.bool,
  className: PropTypes.string,
};

