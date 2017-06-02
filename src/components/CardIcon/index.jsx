import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';
import styles from './CardIcon.scss';

const CardIcon = ({ className, style, color }) => {
  const cardStyle = classNames({
    [styles.wrapper]: true,
    [className]: !!className,
  });

  const gradient = `linear-gradient(to bottom, 
        ${color} 0%, 
        ${Color(color).darken(0.3)} 100%)`;

  return (
    <span
      style={{ background: gradient, ...style }}
      className={cardStyle}
    />
  );
};

CardIcon.defaultProps = {
  color: 'none',
  className: undefined,
  style: {},
};

CardIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.shape({}),
};

export default CardIcon;
