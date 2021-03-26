/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Color from 'color';
import times from 'lodash/times';
import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import AssistIcon from '../AssistIcon';
import styles from './Player.scss';
import pt from '../../propTypes';

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
      options,
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
      <span className={styles.shirt} style={shirtStyle}>{options.showNumber && number}</span>;

    const renderName = () => options.showName && <span className={styles.name}>{name}</span>;

    const renderRating = () =>
      options.showRating && <span className={playerRatingClassName}>{rating}</span>;

    const renderCards = () => options.showCards && (
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
        { key: 'goals', visible: options.showGoals, Icon: GoalIcon },
        { key: 'assists', visible: options.showAssists, Icon: AssistIcon },
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
  name: 'Player Name',
  number: 1,
  rating: 0,
  position: -1,
  cards: { yellow: 0, red: 0 },
  goals: 0,
  assists: 0,
  options: {
    showName: true,
    showNumber: true,
    showRating: false,
    showCards: false,
    showGoals: false,
    showAssists: false,
  },
  className: '',
};

Player.propTypes = {
  name: pt.playerName,
  number: pt.playerNumber,
  rating: pt.playerRating,
  position: pt.playerPosition,
  cards: pt.playerCards,
  goals: pt.playerGoals,
  assists: pt.playerAssists,
  team: pt.team.isRequired,
  options: pt.playerOptions.isRequired,
  className: pt.className,
};

