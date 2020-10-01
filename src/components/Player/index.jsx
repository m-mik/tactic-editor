/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Color from 'color';
import YellowCard from '../YellowCard';
import RedCard from '../RedCard';
import styles from './Player.scss';

const cx = classNames.bind(styles);

export default class Player extends Component {
  render() {
    const { name, position, number, team, className, ...rest } = this.props;
    const { border, backgroundColor, textColor } = team.shirt;
    const isGoalkeeper = position === 0;
    const gkBackgroundColor = Color(backgroundColor).mix(Color('green'), 0.5).rotate(180);

    const shirtStyle = {
      backgroundColor: isGoalkeeper ? gkBackgroundColor : backgroundColor,
      borderColor: border.color,
      borderStyle: border.style,
      color: textColor,
    };

    const wrapperClassName = cx(
      { wrapper: true },
      { [className]: !!className },
    );

    return (
      <div className={wrapperClassName} {...rest}>
        <span className={styles.shirt} style={shirtStyle}>{number}</span>
        <span className={styles.name}>{name}</span>
        <YellowCard className={styles.yellowCard} />
        <RedCard className={styles.redCard} />
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
  position: PropTypes.number.isRequired,
  className: PropTypes.string,
  team: PropTypes.shape({
    shirt: PropTypes.shape({
      border: PropTypes.object.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

