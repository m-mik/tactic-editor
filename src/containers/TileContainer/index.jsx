import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';

import DraggablePlayer from '../../containers/DraggablePlayer';
import ItemTypes from '../../lib/ItemTypes';
import { canDropPlayer } from '../../lib/footballField';
import styles from '../../components/TeamGrid';

const cx = classNames.bind(styles);

class TileContainer extends Component {
  render() {
    const {
      connectDropTarget,
      position,
      isOver,
      canDrop,
    } = this.props;
    
    const { options } = this.props;

    const show = {
      name: options.showName,
      rating: options.showRatings,
      number: options.showNumbers,
      cards: options.showCards,
      goals: options.showGoals,
      assists: options.showAssists,
    };

    const tileClass = cx(
      { fullWidthTile: position === 0 },
      { dropTarget: canDrop && isOver },
    );

    return connectDropTarget(
      <div className={tileClass || undefined}>
        {player && <DraggablePlayer
          team={team}
          onMove={this.props.onPlayerMove}
          onSwap={this.props.onPlayersSwap}
          onTouchTap={this.props.onPlayerSelect}
          show={show}
          {...player}
        />}
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

TileContainer.defaultProps = {
  className: undefined,
  children: null,
};

TileContainer.propTypes = {
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

const mapStateToProps = (state, ownProps) => {

  return {};
};

const DropTargetTileContainer = DropTarget(ItemTypes.PLAYER, tileTarget, collect)(TileContainer);

export default connect(mapStateToProps)(DropTargetTileContainer);
