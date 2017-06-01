import React from 'react';
import PropTypes from 'prop-types';
import Card from '../CardIcon';

const YellowCardIcon = ({ className, style }) => (
  <Card color="#FFE925" className={className} style={style} />
);

YellowCardIcon.defaultProps = {
  className: undefined,
  style: {},
};

YellowCardIcon.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

export default YellowCardIcon;
