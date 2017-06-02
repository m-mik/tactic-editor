import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Title from './Title';
import styles from './Team.scss';

const Team = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
);

Team.defaultProps = {
  children: null,
};

Team.propTypes = {
  children: PropTypes.node,
};

Team.Grid = Grid;
Team.Title = Title;

export default Team;
