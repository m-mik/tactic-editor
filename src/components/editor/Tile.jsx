import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tile = (props) => {
  const tileClass = classNames({
    'full-width': props.fullWidth,
  });

  return (
    <div className={tileClass} />
  );
};

Tile.defaultProps = {
  fullWidth: false,
};

Tile.propTypes = {
  fullWidth: PropTypes.bool,
};

export default Tile;
