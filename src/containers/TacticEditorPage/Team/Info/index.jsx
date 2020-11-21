import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Info.scss';

const cx = classNames.bind(styles);

const Info = ({ type, team }) => {
  const { name } = team;

  const wrapperStyle = cx(
    'wrapper',
    { home: type === 'home' },
    { away: type === 'away' },
  );

  return (
    <div className={wrapperStyle}>
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

Info.defaultProps = {
  team: {
    name: '',
  },
  type: 'home',
};

Info.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
  }),
  type: PropTypes.string,
};

export default Info;
