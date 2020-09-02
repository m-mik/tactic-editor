import React from 'react';
import PropTypes from 'prop-types';
import Card from '../CardIcon';

const RedCardIcon = ({ className, style }) => (
  <Card color="#CE1015" className={className} style={style} />
);

RedCardIcon.defaultProps = {
  className: undefined,
  style: {},
};

RedCardIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

export default RedCardIcon;
