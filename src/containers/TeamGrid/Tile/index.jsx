/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import isEqual from 'lodash/isEqual';
import ItemTypes from '../ItemTypes';
import { canDropPlayer } from '../../../services/footballField';
import styles from '../TeamGrid.scss';

const cx = classNames.bind(styles);

class Tile extends Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.isOver !== nextProps.isOver
    || !isEqual(this.props.children, nextProps.children));
  }

  render() {
    const {
      connectDropTarget,
      position,
      isOver,
      canDrop,
    } = this.props;

    const tileClass = cx(
      { fullWidthTile: position === 0 },
      { dropTarget: canDrop && isOver },
    );

    return connectDropTarget(
      <div className={tileClass || undefined}>
        {this.props.children}
      </div>,
    );
  }
}

const tileTarget = {
  canDrop(props, monitor) {
    const player = monitor.getItem();
    return canDropPlayer(player, props);
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    return { component };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
});

Tile.defaultProps = {
  className: undefined,
  children: null,
};

Tile.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    shirt: PropTypes.object,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(Tile);
