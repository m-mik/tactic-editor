import React from 'react';
import PropTypes from 'prop-types';
import Player from '../../../Player';

const Tile = ({ className, player, shirt }) => (
  <div className={className || undefined}>
    {player && <Player data={player} shirt={shirt} />}
  </div>
);

Tile.defaultProps = {
  className: '',
  player: undefined,
};

Tile.propTypes = {
  className: PropTypes.string,
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
  }),
  shirt: PropTypes.shape({
    border: PropTypes.object.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }).isRequired,
};

export default Tile;
