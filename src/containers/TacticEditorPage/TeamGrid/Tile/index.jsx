import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';
import isEqual from 'lodash/isEqual';
import ItemTypes from '../ItemTypes';
import { canDropPlayer } from '../../../../lib/footballField/index';
import styles from '../TeamGrid.scss';

const cx = classNames.bind(styles);

class Tile extends Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.isOver !== nextProps.isOver)
      || !isEqual(this.props.children, nextProps.children);
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
    const isGoalkeeper = player.position === 0;
    const hasPlayer = props.children;
    return !isGoalkeeper && !hasPlayer && canDropPlayer(player, props);
  },

  drop(props, monitor, component) {
    return monitor.didDrop() ? undefined : { component };
  },
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

Tile.defaultProps = {
  className: undefined,
  children: null,
};

Tile.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  team: PropTypes.shape({ // eslint-disable-line react/no-unused-prop-types
    id: PropTypes.number.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(Tile);
