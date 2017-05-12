import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Tile = (props) => {
  const tileClass = classNames({
    'football-field__tile': true,
    'football-field__tile--full-width': props.fullWidth,
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
