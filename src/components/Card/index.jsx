import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Card.scss';

const Card = ({ className, color }) => {
  const cardStyle = classNames({
    [styles.wrapper]: true,
    [className]: true,
  });

  return (
    <div
      style={{ background: color }}
      className={cardStyle}
    />
  );
};

export default Card;
