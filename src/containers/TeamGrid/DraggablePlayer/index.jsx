import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash/flow';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import { getCompOffset } from '../../../services/footballField';
import styles from './DraggablePlayer.scss';

const cx = classNames.bind(styles);

class DraggablePlayer extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      onMove,
      onSwap,
      isOver,
      canDrop,
      isDragging,
      ...rest } = this.props;
    const { left = 0, top = 0 } = this.props.data.transition || {};
    const cssTransition = (left || top) ? 'none' : '';
    const wrapperStyle = cx(
      'wrapper',
      { isDragging },
    );

    return (
      <Player
        className={wrapperStyle}
        ref={(instance) => {
          connectDropTarget(findDOMNode(instance));
          connectDragSource(findDOMNode(instance));
        }}
        style={{ left, top, transition: cssTransition }}
        {...rest}
      />
    );
  }
}
DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
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
    // TODO: refactor
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const draggedPlayerId = props.data.id;
    const targetComp = dropResult.component;
    const targetPlayerPos = targetComp.props.position;
    const targetOffset = getCompOffset(targetComp, component);
    const sourceOffset = getCompOffset(component, targetComp);

    if (targetComp.props.data) {
      const targetPlayerComp = targetComp;
      targetPlayerComp.props.onSwap([
        { player: props.data, offset: targetOffset },
        { player: targetPlayerComp.props.data, offset: sourceOffset },
      ]);
    } else {
      props.onMove(draggedPlayerId, targetPlayerPos, targetOffset);
    }
  },
};

const playerTarget = {
  canDrop(props, monitor) {
    // todo: same logic as in tile component
    const item = monitor.getItem();
    const sameTeam = props.team.id === item.team.id;
    const isNewPosition = item.data.position !== props.position;
    return isNewPosition && sameTeam;
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
