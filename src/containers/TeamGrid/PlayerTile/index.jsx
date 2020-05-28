import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Tile from '../Tile';
import DraggablePlayer from '../DraggablePlayer';

class PlayerTile extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.player, nextProps.player);
  }

  render() {
    const {
      position,
      team,
      player,
      onPlayerMove,
      onPlayersSwap,
    } = this.props;

    return (
      <Tile
        key={position}
        position={position}
        team={{ id: team.id }}
      >
        {player && <DraggablePlayer
          team={{ id: team.id, shirt: team.shirt }}
          onMove={onPlayerMove}
          onSwap={onPlayersSwap}
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
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
};

export default PlayerTile;
