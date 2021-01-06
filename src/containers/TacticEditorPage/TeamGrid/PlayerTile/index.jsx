import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Tile from '../Tile/index';
import DraggablePlayer from '../../DraggablePlayer/index';

class PlayerTile extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.player, nextProps.player)
      || !isEqual(this.props.team.shirt, nextProps.team.shirt);
  }

  render() {
    const {
      position,
      team,
      player,
      onPlayerMove,
      onPlayersSwap,
      onPlayerTouchTap,
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
  onPlayerTouchTap: PropTypes.func.isRequired,
};

export default PlayerTile;
