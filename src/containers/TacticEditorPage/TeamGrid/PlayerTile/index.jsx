import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Tile from '../Tile/index';
import DraggablePlayer from '../../DraggablePlayer/index';

class PlayerTile extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const {
      position,
      team,
      player,
      onPlayerMove,
      onPlayersSwap,
      onPlayerTouchTap,
      show,
    } = this.props;

    return (
      <Tile
        key={position}
        position={position}
        team={team}
      >
        {player && <DraggablePlayer
          team={team}
          onMove={onPlayerMove}
          onSwap={onPlayersSwap}
          onTouchTap={onPlayerTouchTap}
          show={show}
          {...player}
        />}
      </Tile>
    );
  }
}

PlayerTile.defaultProps = {
  player: undefined,
};

PlayerTile.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  position: PropTypes.number.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  show: PropTypes.shape({
    name: PropTypes.bool.isRequired,
    number: PropTypes.bool.isRequired,
    rating: PropTypes.bool.isRequired,
    cards: PropTypes.bool.isRequired,
    goals: PropTypes.bool.isRequired,
    assists: PropTypes.bool.isRequired,
  }).isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
  onPlayerTouchTap: PropTypes.func.isRequired,
};

export default PlayerTile;
