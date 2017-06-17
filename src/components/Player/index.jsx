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
      show,
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

    const renderShirt = () =>
      <span className={styles.shirt} style={shirtStyle}>{show.number && number}</span>;

    const renderName = () => show.name && <span className={styles.name}>{name}</span>;

    const renderRating = () =>
      show.rating && <span className={playerRatingClassName}>{rating}</span>;

    const renderCards = () => show.cards && (
      <div className={styles.cards}>
        {times(cards.yellow).map(index =>
          <YellowCardIcon key={index} className={styles.yellowCard} />,
            )}
        {times(cards.red).map(index =>
          <RedCardIcon key={index} className={styles.redCard} />,
            )}
      </div>
    );

    const renderStats = () => {
      const stats = [
        { key: 'goals', visible: show.goals, Icon: GoalIcon },
        { key: 'assists', visible: show.assists, Icon: AssistIcon },
      ];
      return stats.filter(stat => stat.visible).map(stat => (
        <div key={stat.key} className={styles[stat.key]}>
          {times(this.props[stat.key]).map(index =>
            <stat.Icon key={index} />,
          )}
        </div>
      ));
    };

    return (
      <div className={wrapperClassName} {...rest}>
        {renderShirt()}
        {renderName()}
        {renderRating()}
        {renderCards()}
        {renderStats()}
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
  show: {
    name: true,
    number: true,
    rating: false,
    cards: false,
    goals: false,
    assists: false,
  },
};

// todo: fix displaying
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
  show: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    number: PropTypes.bool.isRequired,
    rating: PropTypes.bool.isRequired,
    cards: PropTypes.bool.isRequired,
    goals: PropTypes.bool.isRequired,
    assists: PropTypes.bool.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

