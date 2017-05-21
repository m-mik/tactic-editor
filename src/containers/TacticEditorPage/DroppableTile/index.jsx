import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import Tile from '../../../components/FootballField/TeamGrid/Tile';
import ItemTypes from '../ItemTypes';

class DroppableTile extends Component {
  render() {
    const { connectDropTarget, ...rest } = this.props;
    return (
      <Tile
        {...rest}
        ref={instance => connectDropTarget(findDOMNode(instance))}
      />
    );
  }
}

const tileTarget = {
  drop(props, monitor, component) {
    console.log(component);
    console.log(monitor.getItem());
    console.log(props);
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(DroppableTile);
