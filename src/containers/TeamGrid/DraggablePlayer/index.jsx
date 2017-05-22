import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import styles from './DraggablePlayer.scss';

class DraggablePlayer extends Component {
  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      newPosition: -1,
    };

    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
  }

  handleTransitionEnd() {
    const { data: { id }, onDragEnd } = this.props;
    onDragEnd(id, this.state.newPosition);
  }

  render() {
    const { x, y } = this.state;
    const { connectDragSource, ...rest } = this.props;
    return (
      <Player
        onTransitionEnd={this.handleTransitionEnd}
        className={styles.draggable}
        style={{ left: x, top: y }}
        {...rest}
        ref={instance => connectDragSource(findDOMNode(instance))}
      />
    );
  }
}

DraggablePlayer.defaultProps = {
  onDragEnd: () => {},
};

DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const playerSource = {
  beginDrag(props) {
    console.log('drag start:', props);
    return { player: props.data };
  },

  endDrag(props, monitor, component) {
    const playerNode = findDOMNode(component);

    if (!playerNode) return;

    const playerX = playerNode.offsetLeft;
    const playerY = playerNode.offsetTop;
    const item = monitor.getItem();
    console.log(monitor.getDropResult());
    const { tileX, tileY, newPosition } = monitor.getDropResult();

    const x = tileX - playerX;
    const y = tileY - playerY;

    component.setState({ x, y, newPosition });

    // console.log('draggableplayer', );
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  // isDragging: monitor.isDragging(),
});

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(DraggablePlayer);
