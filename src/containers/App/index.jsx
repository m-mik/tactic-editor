import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.scss';

const App = props => (
  <div className={styles.wrapper}>
    {props.children}
  </div>
);

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;
