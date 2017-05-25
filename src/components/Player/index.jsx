/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import styles from './Player.scss';

export default class Player extends Component {
  render() {
    const { data, team, className, ...rest } = this.props;
    const { border, backgroundColor, textColor } = team.shirt;
    const isGoalkeeper = data.position === 0;
    const gkBackgroundColor = Color(backgroundColor).mix(Color('green'), 0.5).rotate(180);

    const shirtStyle = {
      backgroundColor: isGoalkeeper ? gkBackgroundColor : backgroundColor,
      borderColor: border.color,
      borderStyle: border.style,
      color: textColor,
    };

    const wrapperClassName = classNames({
      [styles.wrapper]: true,
      [className]: className,
    });

    return (
      <div className={wrapperClassName} {...rest}>
        <span className={styles.shirt} style={shirtStyle}>{data.number}</span>
        <span className={styles.name}>{data.name}</span>
      </div>
    );
  }
}

Player.defaultProps = {
  className: '',
};

Player.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
  team: PropTypes.shape({
    shirt: PropTypes.shape({
      border: PropTypes.object.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

