import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash/flow';
import isEqual from 'lodash/isEqual';

import Player from '../../components/Player/index';
import ItemTypes from '../../lib/ItemTypes';
import { canDropPlayer } from '../../lib/footballField/index';
import styles from './DraggablePlayer.scss';

const cx = classNames.bind(styles);

class DraggablePlayer extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      onMove,
      onSwap,
      onTouchTap,
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
          const playerNode = findDOMNode(instance);
          connectDropTarget(playerNode);
          connectDragSource(playerNode);
        }}
        style={{
          transform: `translate(${left}px, ${top}px)`,
          transition: cssTransition,
        }}
        onTouchTap={event => onTouchTap(event, id)}
        {...rest}
      />
    );
  }
}

DraggablePlayer.defaultProps = {
  transition: undefined,
};

DraggablePlayer.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  cards: PropTypes.shape({
    yellow: PropTypes.number.isRequired,
    red: PropTypes.number.isRequired,
  }).isRequired,
  goals: PropTypes.number.isRequired,
  assists: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  onTouchTap: PropTypes.func.isRequired,
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
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const targetComp = dropResult.component;
    const targetPos = targetComp.props.position;

    if (targetComp.currentType === 'player') {
      targetComp.props.onSwap(props, targetComp.props);
    } else {
      props.onMove(props, targetPos);
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
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

export default flow(
  DragSource(ItemTypes.PLAYER, playerSource, collectSource),
  DropTarget(ItemTypes.PLAYER, playerTarget, collectTarget),
)(DraggablePlayer);
