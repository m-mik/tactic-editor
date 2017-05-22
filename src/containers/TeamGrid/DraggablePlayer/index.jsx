import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';

class DraggablePlayer extends Component {
  render() {
    const { connectDragSource, ...rest } = this.props;
    return (
      <Player
        {...rest}
        ref={instance => connectDragSource(findDOMNode(instance))}
      />
    );
  }
}

const playerSource = {
  beginDrag(props) {
    console.log('drag start:', props);
    return { data: props.data };
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  // isDragging: monitor.isDragging(),
});

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(DraggablePlayer);
