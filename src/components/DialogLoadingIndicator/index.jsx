import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';
import styles from './DialogLoadingIndicator.scss';

const DialogLoadingIndicator = props => (
  <LoadingIndicator {...props} />
);

DialogLoadingIndicator.defaultProps = {
  className: styles.wrapper,
  size: 50,
};

DialogLoadingIndicator.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default DialogLoadingIndicator;
