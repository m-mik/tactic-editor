import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import flow from 'lodash/flow';

import pt from '../../propTypes';
import Player from '../../components/Player/index';
import ItemTypes from '../../lib/ItemTypes';
import { canDropPlayer, isOnBench, isOnField } from '../../lib/footballField/index';
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
      onDropOver,
      onTouchTap,
      isOver,
      canDrop,
      playerId,
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
        onClick={event => onTouchTap(event, playerId)}
        playerId={playerId}
        {...rest}
      />
    );
  }
}

DraggablePlayer.defaultProps = {
  transition: undefined,
};

DraggablePlayer.propTypes = {
  playerId: pt.playerId.isRequired,
  name: pt.playerName.isRequired,
  number: pt.playerNumber.isRequired,
  rating: pt.playerRating.isRequired,
  position: pt.playerPosition.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onMove: PropTypes.func.isRequired,
  onSwap: PropTypes.func.isRequired,
  onDropOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  transition: pt.transition,
  isDragging: PropTypes.bool.isRequired,
  team: pt.team.isRequired,
};

const playerSource = {
  beginDrag(props) {
    return props;
  },

  // eslint-disable-next-line no-unused-vars
  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const targetComp = dropResult.component;
    const targetPos = targetComp.props.position;

    const isPlayerLeavingField = (isOnBench(props.position) && isOnField(targetPos))
      || (isOnBench(targetPos) && isOnField(props.position));

    if (targetComp.currentType !== 'player') {
      props.onMove(props, targetPos);
    } else if (isPlayerLeavingField) {
      props.onDropOver(props, targetComp.props);
    } else {
      targetComp.props.onSwap(props, targetComp.props);
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
