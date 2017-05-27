import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash/flow';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import { getCompOffset, canDropPlayer } from '../../../services/footballField';
import styles from './DraggablePlayer.scss';

const cx = classNames.bind(styles);

class DraggablePlayer extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isDragging !== nextProps.isDragging
      || this.props.isOver !== nextProps.isOver
      || nextProps.position !== this.props.position
      || this.props.transition !== nextProps.transition;
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      onMove,
      onSwap,
      isOver,
      canDrop,
      id,
      transition,
      isDragging,
      ...rest } = this.props;

    const { left = 0, top = 0 } = this.props.transition || {};
    const cssTransition = (left || top) ? 'none' : '';
    const wrapperStyle = cx(
      'wrapper',
      { isDragging },
      { dropTarget: canDrop && isOver },
    );

    return (
      <Player
        className={wrapperStyle}
        ref={(instance) => {
          connectDropTarget(findDOMNode(instance));
          connectDragSource(findDOMNode(instance));
        }}
        style={{ left, top, transition: cssTransition }}
        onTransitionEnd={() => this.setState({ isMoving: false })}
        {...rest}
      />
    );
  }
}

DraggablePlayer.defaultProps = {
  transition: undefined,
};

DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  transition: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  isDragging: PropTypes.bool.isRequired,
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
};

const playerSource = {
  beginDrag(props) {
    return props;
  },

  endDrag(props, monitor, component) {
    // TODO: refactor
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const draggedPlayerId = props.id;
    const targetComp = dropResult.component;
    const targetPlayerPos = targetComp.props.position;
    const targetOffset = getCompOffset(targetComp, component);
    const sourceOffset = getCompOffset(component, targetComp);

    if (targetComp.currentType === 'player') {
      const targetPlayerComp = targetComp;
      targetPlayerComp.props.onSwap([
        { player: props, offset: targetOffset },
        { player: targetPlayerComp.props, offset: sourceOffset },
      ]);
    } else {
      props.onMove(draggedPlayerId, targetPlayerPos, targetOffset);
    }
  },
};

const playerTarget = {
  canDrop(props, monitor) {
    const player = monitor.getItem();
    return canDropPlayer(player, props);
  },

  drop(props, monitor, component) {
    return { component };
  },
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

export default flow(
  DragSource(ItemTypes.PLAYER, playerSource, collectSource),
  DropTarget(ItemTypes.PLAYER, playerTarget, collectTarget),
)(DraggablePlayer);
