import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';

const Loading = ({ size, className }) => <CircularProgress size={size} className={className} />;

Loading.defaultProps = {
  className: 'loading',
  size: 50,
};

Loading.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Loading;
