import React from 'react';
import PropTypes from 'prop-types';

import styles from './Main.scss';

const Main = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
);

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
