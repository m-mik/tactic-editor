import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';

const RedCard = ({ className }) => (
  <Card color="red" className={className} />
);

RedCard.defaultProps = {
  className: undefined,
};

RedCard.propTypes = {
  className: PropTypes.string,
};

export default RedCard;
