import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import styles from './FootballField.scss';

const FootballField = props => (
  <div className={styles.wrapper}>
    <div className={styles.body}>
      {props.children}
      <Overlay />
    </div>
  </div>
  );

FootballField.defaultProps = {
  children: null,
};

FootballField.propTypes = {
  children: PropTypes.node,
};

export default FootballField;

