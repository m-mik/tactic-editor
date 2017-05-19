import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ className }) => (
  <div className={className} />
);

Tile.defaultProps = {
  className: null,
};

Tile.propTypes = {
  className: PropTypes.string,
};

export default Tile;
