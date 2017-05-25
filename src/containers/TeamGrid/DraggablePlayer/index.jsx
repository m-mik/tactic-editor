import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import classNames from 'classnames/bind';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import { getCompOffset } from '../../../services/footballField';
import styles from './DraggablePlayer.scss';

const cx = classNames.bind(styles);

class DraggablePlayer extends Component {
  render() {
    const { connectDragSource, onMove, onSwap, isDragging, ...rest } = this.props;
    const { left = 0, top = 0 } = this.props.data.transition || {};
    const cssTransition = (left || top) ? 'none' : '';
    const wrapperStyle = cx(
      'wrapper',
      { isDragging },
    );

    return (
      <Player
        className={wrapperStyle}
        ref={instance => connectDragSource(findDOMNode(instance))}
        style={{ left, top, transition: cssTransition }}
        {...rest}
      />
    );
  }
}
DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    transition: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
    }),
  }).isRequired,
  isDragging: PropTypes.bool.isRequired,
};

const playerSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const draggedPlayerId = props.data.id;
    const targetTileComp = dropResult.component;
    const targetPlayerPos = targetTileComp.props.position;
    const targetOffset = getCompOffset(targetTileComp, component);
    const sourceOffset = getCompOffset(component, targetTileComp);

    if (targetTileComp.player) {
      const targetPlayerComp = targetTileComp.player.decoratedComponentInstance;
      targetPlayerComp.props.onSwap([
        { player: props.data, offset: targetOffset },
        { player: targetPlayerComp.props.data, offset: sourceOffset },
      ]);
    } else {
      props.onMove(draggedPlayerId, targetPlayerPos, targetOffset);
    }
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(DraggablePlayer);
