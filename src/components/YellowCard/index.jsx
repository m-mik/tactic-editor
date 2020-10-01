import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const YellowCard = ({ className }) => (
  <Card color="yellow" className={className} />
);

YellowCard.defaultProps = {
  className: undefined,
};

YellowCard.propTypes = {
  className: PropTypes.string,
};

export default YellowCard;
