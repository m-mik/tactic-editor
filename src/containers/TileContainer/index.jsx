import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';

import pt from '../../propTypes';
import ItemTypes from '../../lib/ItemTypes';
import DraggablePlayer from '../DraggablePlayer';
import { canDropPlayer } from '../../lib/footballField';
import styles from '../../components/TeamGrid/TeamGrid.scss';

const cx = classNames.bind(styles);

class TileContainer extends Component {
  render() {
    const {
      connectDropTarget,
      position,
      isOver,
      canDrop,
      playerOptions,
      onPlayerMove,
      onPlayersSwap,
      onPlayerTouchTap,
      player,
      team,
      ...rest
    } = this.props;

    const tileClass = cx(
      { fullWidthTile: position === 0 },
      { dropTarget: canDrop && isOver },
    );

    return connectDropTarget(
      <div className={tileClass} {...rest}>
        {player && <DraggablePlayer
          team={team}
          onMove={onPlayerMove}
          onSwap={onPlayersSwap}
          onTouchTap={onPlayerTouchTap}
          options={playerOptions}
          {...player}
        />}
      </div>,
    );
  }
}

const tileTarget = {
  canDrop(props, monitor) {
    const player = monitor.getItem();
    return canDropPlayer(player, props);
  },

  drop(props, monitor, component) {
    return monitor.didDrop() ? undefined : { component };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

TileContainer.defaultProps = {
  player: null,
  team: null,
};

TileContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
  onPlayerTouchTap: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  team: pt.team,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  player: pt.player,
  playerOptions: pt.playerOptions.isRequired,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(TileContainer);
