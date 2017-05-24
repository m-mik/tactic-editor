import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import { getCompOffset } from '../../../services/footballField';
import styles from './DraggablePlayer.scss';

class DraggablePlayer extends Component {
  render() {
    const { connectDragSource, onMove, ...rest } = this.props;
    const { left = 0, top = 0 } = this.props.data.transition || {};
    const transition = (left || top) ? 'none' : '';

    return (
      <Player
        className={styles.wrapper}
        ref={instance => connectDragSource(findDOMNode(instance))}
        style={{ left, top, transition }}
        {...rest}
      />
    );
  }
}

DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    transition: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
    }),
  }).isRequired,
};

const playerSource = {
  beginDrag(props) {
    console.log('drag start:', props);
    return { position: props.data.position };
  },

  endDrag(props, monitor, component) {
    // TODO: refactor
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const draggedPlayerComp = component;
    const targetTileComp = dropResult.component;

    const draggedPlayerId = draggedPlayerComp.props.data.id;

    const targetPlayerPos = targetTileComp.props.position;
    const draggedPlayerPos = draggedPlayerComp.props.data.position;
    const offset1 = getCompOffset(targetTileComp, draggedPlayerComp);
    const offset2 = getCompOffset(draggedPlayerComp, targetTileComp);

    if (targetTileComp.player) {
      const targetPlayerComp = targetTileComp.player.decoratedComponentInstance;
      const targetPlayerId = targetPlayerComp.props.data.id;
      targetPlayerComp.props.onMove(targetPlayerId, draggedPlayerPos, offset2);
    }

    draggedPlayerComp.props.onMove(draggedPlayerId, targetPlayerPos, offset1);
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  // isDragging: monitor.isDragging(),
});

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(DraggablePlayer);
