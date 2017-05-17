import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from 'material-ui';
import styles from './Main.scss';

const Main = props => (
  <div className={styles.wrapper}>
    <Paper zDepth={1}>
      {props.children}
    </Paper>
  </div>
);

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
