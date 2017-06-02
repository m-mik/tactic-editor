import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Info from './Info';
import styles from './Team.scss';

const Team = (props) => {
  const { children, ...rest } = props;

  return (
    <div className={styles.wrapper}>
      {React.Children.map(props.children,
        child => React.cloneElement(child, rest),
      )}
    </div>
  );
};

Team.defaultProps = {
  children: null,
};

Team.propTypes = {
  children: PropTypes.node,
};

Team.Grid = Grid;
Team.Info = Info;

export default Team;
