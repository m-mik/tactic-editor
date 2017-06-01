import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './CardIcon.scss';

const CardIcon = ({ className, style, color }) => {
  const cardStyle = classNames({
    [styles.wrapper]: true,
    [className]: !!className,
  });

  return (
    <span
      style={{ background: color, ...style }}
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
