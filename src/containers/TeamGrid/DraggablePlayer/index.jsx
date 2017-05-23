import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import Player from '../../../components/Player/index';
import ItemTypes from '../ItemTypes';
import { getCompOffset } from '../../../services/footballField';
import styles from './DraggablePlayer.scss';

class DraggablePlayer extends Component {
  constructor() {
    super();

    this.initialState = {
      style: {
        left: 0,
        top: 0,
        transition: 'none',
      },
      newPosition: -1,
      id: 0,
    };

    this.state = this.initialState;
    this.handleMoveTransitionEnd = this.handleMoveTransitionEnd.bind(this);
  }

  updateState(targetComp, newPosition, id) {
    this.setState({
      style: {
        ...getCompOffset(this, targetComp),
        transition: '',
      },
      newPosition,
      id,
    });
  }

  resetState() {
    this.setState(this.initialState);
  }

  handleMoveTransitionEnd() {
    if (this.state.newPosition !== -1) {
      const { onMoveTransitionEnd, data, onSwapPlayers } = this.props;
      const { id, newPosition } = this.state;
      console.log(data, newPosition);
      //
      // if (swapWith) {
      //   console.log('swap', data, swapWith);
      //   // this.resetStyle();
      //   //onSwapPlayers(data, swapWith);
      // }
      this.resetState();

      onMoveTransitionEnd(id, newPosition);
    }
  }

  render() {
    const { connectDragSource, onMoveTransitionEnd, onSwapPlayers, ...rest } = this.props;
    return (
      <Player
        onTransitionEnd={this.handleMoveTransitionEnd}
        className={styles.wrapper}
        ref={instance => connectDragSource(findDOMNode(instance))}
        style={this.state.style}
        {...rest}
      />
    );
  }
}

DraggablePlayer.defaultProps = {
  onMoveTransitionEnd: () => {},
};

DraggablePlayer.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  onMoveTransitionEnd: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

const playerSource = {
  beginDrag(props) {
    console.log('drag start:', props);
    return { position: props.data.position };
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if (!dropResult) return;

    const draggedPlayerComp = component;
    const targetTileComp = dropResult.component;

    draggedPlayerComp.updateState(targetTileComp, targetTileComp.props.position, draggedPlayerComp.props.data.id);

    if (targetTileComp.player) {
      const targetPlayerComp = targetTileComp.player.decoratedComponentInstance;
      targetPlayerComp.updateState(draggedPlayerComp, props.data.position, targetPlayerComp.props.data.id);

      // draggedPlayerComp.swapPlayers();
    }
  },
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  // isDragging: monitor.isDragging(),
});

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(DraggablePlayer);
