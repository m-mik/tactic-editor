import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';

const Loading = props => <CircularProgress size={props.size} className="loading" />;

Loading.propTypes = {
  size: PropTypes.number,
};

Loading.defaultProps = {
  size: 50,
};

export default Loading;
