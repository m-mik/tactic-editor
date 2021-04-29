import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';
import styles from './FootballField.scss';

const FootballField = ({ children, className, ...rest }) => (
  <div className={`${className} ${styles.wrapper}`} {...rest}>
    <div className={styles.body}>
      <Overlay />
      {children}
    </div>
  </div>
  );

FootballField.defaultProps = {
  children: null,
  className: '',
};

FootballField.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FootballField;

