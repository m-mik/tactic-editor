import React from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import styles from './Player.scss';

const Player = (props) => {
  const { data, shirt } = props;
  const { border, backgroundColor, textColor } = shirt;
  const isGoalkeeper = data.position === 0;
  const gkBackgroundColor = Color(backgroundColor).mix(Color('green'), 0.5).rotate(180);

  const shirtStyle = {
    backgroundColor: isGoalkeeper ? gkBackgroundColor : backgroundColor,
    borderColor: border.color,
    borderStyle: border.style,
    color: textColor,
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.shirt} style={shirtStyle}>{data.number}</span>
      <span className={styles.name}>{data.name}</span>
    </div>
  );
};

Player.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
  shirt: PropTypes.shape({
    border: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }).isRequired,
};


export default Player;
