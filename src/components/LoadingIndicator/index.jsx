import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './LoadingIndicator.scss';

const LoadingIndicator = props => (
  <CircularProgress {...props} />
);

LoadingIndicator.defaultProps = {
  className: styles.loadingIndicator,
  size: 50,
};

LoadingIndicator.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default LoadingIndicator;
