/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import Color from 'color';
import times from 'lodash/times';

import YellowCardIcon from '../YellowCardIcon';
import RedCardIcon from '../RedCardIcon';
import GoalIcon from '../GoalIcon';
import AssistIcon from '../AssistIcon';
import SubstitutionOnIcon from '../SubstitutionOnIcon';
import SubstitutionOffIcon from '../SubstitutionOffIcon';
import styles from './Player.scss';
import pt from '../../propTypes';
import { isOnBench, isOnField, TILES_COUNT } from '../../lib/footballField';
import OwnGoalIcon from '../OwnGoalIcon';

const cx = classNames.bind(styles);

export default class Player extends Component {
  render() {
    const {
      playerId,
      name,
      position,
      number,
      team,
      className,
      rating,
      options,
      playerStats,
      ...rest
    } = this.props;

    const { yellowCards, redCards } = playerStats;
    const { border, backgroundColor, textColor } = team.shirt;
    const isGoalkeeper = position === 0 || position === TILES_COUNT;
    const gkBackgroundColor = Color(backgroundColor).mix(Color('green'), 0.5).rotate(180);
    const playerBg = isGoalkeeper ? gkBackgroundColor : backgroundColor;
    const { substitutions } = team;
    const subPlayerIds = substitutions.reduce((set, sub) =>
      new Set([...set, ...sub.players]), new Set());

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
        {times(yellowCards).map(index =>
          <YellowCardIcon key={index} className={styles.yellowCard} />,
            )}
        {times(redCards).map(index =>
          <RedCardIcon key={index} className={styles.redCard} />,
            )}
      </div>
    );

    const renderSubstitution = () => {
      if (!this.props.options.showSubstitution) return null;
      const existsInSubs = subPlayerIds.has(playerId);
      const on = existsInSubs && isOnBench(position);
      const off = existsInSubs && isOnField(position);
      return (
        <span className={styles.substitution}>
          {on && <SubstitutionOnIcon />}
          {off && <SubstitutionOffIcon />}
        </span>
      );
    };

    const renderStats = () => {
      const stats = [
        { key: 'goals', visible: options.showGoals, Icon: GoalIcon },
        { key: 'ownGoals', visible: options.showGoals, Icon: OwnGoalIcon },
        { key: 'assists', visible: options.showAssists, Icon: AssistIcon },
      ];
      return stats.filter(stat => stat.visible).map(stat => (
        <div key={stat.key} className={styles[stat.key]}>
          {times(this.props.playerStats[stat.key]).map(index =>
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
        {renderSubstitution()}
        {renderStats()}
      </div>
    );
  }
}
Player.defaultProps = {
  playerId: 0,
  name: 'Player',
  number: 1,
  rating: 0,
  position: -1,
  playerStats: {
    yellowCards: 0,
    redCards: 0,
    goals: 0,
    assists: 0,
  },
  options: {
    showName: true,
    showNumber: true,
    showRating: false,
    showCards: false,
    showGoals: false,
    showAssists: false,
    showSubstitution: false,
  },
  className: '',
};

Player.propTypes = {
  playerId: pt.playerId,
  playerStats: pt.playerStats,
  name: pt.playerName,
  number: pt.playerNumber,
  rating: pt.playerRating,
  position: pt.playerPosition,
  team: pt.team.isRequired,
  options: pt.playerOptions.isRequired,
  className: pt.className,
};
