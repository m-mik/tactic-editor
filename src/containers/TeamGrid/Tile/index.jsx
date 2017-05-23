/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import DraggablePlayer from '../DraggablePlayer';
import styles from '../TeamGrid.scss';

class Tile extends Component {
  render() {
    const {
      player,
      shirt,
      connectDropTarget,
      position,
      onMovePlayerTransitionEnd,
      onSwapPlayers,
    } = this.props;

    const tileClass = position === 0 ? styles.fullWidthTile : undefined;

    return connectDropTarget(
      <div className={tileClass}>
        {player &&
        <DraggablePlayer
          ref={(dp) => { this.player = dp; }}
          data={player}
          shirt={shirt}
          onMoveTransitionEnd={onMovePlayerTransitionEnd}
          onSwapPlayers={onSwapPlayers}
        />}
      </div>,
    );
  }
}

const tileTarget = {
  drop(props, monitor, component) {
    return { component };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

Tile.defaultProps = {
  className: undefined,
  children: null,
};

Tile.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(Tile);
