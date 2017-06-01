import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { white } from 'material-ui/styles/colors';
import styles from './BallIcon.scss';

const BallIcon = ({ className, ...rest }) => (
  <FontIcon
    className={`${styles.icon} ${className}`}
    color={white}
    {...rest}
  >&#xf1e3;</FontIcon>
);

BallIcon.defaultProps = {
  className: '',
};

BallIcon.propTypes = {
  className: PropTypes.string,
};

export default BallIcon;
