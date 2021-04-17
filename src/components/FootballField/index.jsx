import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import styles from './FootballField.scss';

const FootballField = ({ children, ...rest }) => (
  <div className={styles.wrapper} {...rest}>
    <div className={styles.body}>
      <Overlay />
      {children}
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

