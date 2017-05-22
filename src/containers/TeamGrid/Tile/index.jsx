/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';

class Tile extends Component {
  render() {
    const { className, children, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className={className || undefined}>
        {children}
      </div>,
    );
  }
}

const tileTarget = {
  drop(props, monitor, component) {
    const droppedPlayer = monitor.getItem().player;
    props.onDropPlayer(droppedPlayer, props.position);
    // console.log(component);
    // console.log();
    // console.log(props);
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
  onDropPlayer: () => {},
};

Tile.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  onDropPlayer: PropTypes.func,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(Tile);
