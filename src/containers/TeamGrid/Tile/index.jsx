/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import isEqual from 'lodash/isEqual';
import ItemTypes from '../ItemTypes';
import DraggablePlayer from '../DraggablePlayer';
import styles from '../TeamGrid.scss';

const cx = classNames.bind(styles);

class Tile extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.canDrop !== nextProps.canDrop ||
    this.props.isOver !== nextProps.isOver ||
    !isEqual(this.props.player, nextProps.player);
  }

  render() {
    const {
      player,
      team,
      connectDropTarget,
      position,
      onMovePlayer,
      onSwapPlayers,
      isOver,
      canDrop,
    } = this.props;

    const tileClass = cx(
      { fullWidthTile: position === 0 },
      { dropTarget: canDrop && isOver },
    );

    return connectDropTarget(
      <div className={tileClass || undefined}>
        {player && (<DraggablePlayer
          ref={(dp) => { this.player = dp; }}
          data={player}
          team={team}
          onMove={onMovePlayer}
          onSwap={onSwapPlayers}
        />)}
      </div>,
    );
  }
}

const tileTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    const sameTeam = props.team.id === item.team.id;
    const isNewPosition = item.data.position !== props.position;
    return isNewPosition && sameTeam;
  },

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
  player: undefined,
  transition: {},
};

Tile.propTypes = {
  onMovePlayer: PropTypes.func.isRequired,
  onSwapPlayers: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  player: PropTypes.shape({
    id: PropTypes.number,
    position: PropTypes.position,
    name: PropTypes.string,
  }),
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    shirt: PropTypes.object,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(Tile);
