import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import pt from '../../propTypes';
import ItemTypes from '../../lib/ItemTypes';
import DraggablePlayer from '../DraggablePlayer';
import { canDropPlayer } from '../../lib/footballField';
import styles from '../../components/TeamGrid/TeamGrid.scss';
import {
  movePlayer,
  selectPlayer,
  setPlayersToReplace,
  swapPlayers,
} from '../TacticPage/actions';
import withDragDropContext from '../../lib/withDragDropContext';
import { makeSelectPlayerOptions } from '../../data/tacticDetails/selectors';
import { makeSelectPlayerStats } from '../../data/players/selectors';

const cx = classNames.bind(styles);

class TileContainer extends Component {
  render() {
    const {
      connectDropTarget,
      position,
      isOver,
      canDrop,
      playerOptions,
      onPlayerMove,
      onPlayerSwap,
      onPlayerSelect,
      onDropOverPlayer,
      playerStats,
      player,
      team,
      ...rest
    } = this.props;

    const tileClass = cx(
      { fullWidthTile: position === 0 },
      { dropTarget: canDrop && isOver },
    );

    return connectDropTarget(
      <div className={tileClass} {...rest}>
        {player && <DraggablePlayer
          team={team}
          onMove={onPlayerMove}
          onSwap={onPlayerSwap}
          onDropOver={(sourceProps, targetProps) => onDropOverPlayer(
            { p1: sourceProps, p2: targetProps },
          )}
          onClick={() => onPlayerSelect(player.id)}
          options={playerOptions}
          playerId={player.id}
          playerStats={playerStats}
          {...player}
        />}
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
    return monitor.didDrop() ? undefined : { component };
  },
};

// eslint-disable-next-line no-shadow
const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
});

TileContainer.defaultProps = {
  player: null,
  team: null,
};

TileContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  team: pt.team,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  player: pt.player,
  playerStats: pt.playerStats.isRequired,
  playerOptions: pt.playerOptions.isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayerSwap: PropTypes.func.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
  onDropOverPlayer: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const selectPlayerOptions = makeSelectPlayerOptions();
  const selectPlayerStats = makeSelectPlayerStats();
  return (state, ownProps) => ({
    playerOptions: selectPlayerOptions(state, ownProps),
    playerStats: selectPlayerStats(state, ownProps),
  });
};

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
  onPlayerSwap: swapPlayers,
  onPlayerSelect: selectPlayer,
  onDropOverPlayer: setPlayersToReplace,
};

const ConnectedTileContainer = connect(makeMapStateToProps, mapDispatchToProps)(TileContainer);
const DragDropConnectedTileContainer = withDragDropContext(ConnectedTileContainer);

export default DropTarget(ItemTypes.PLAYER, tileTarget, collect)(DragDropConnectedTileContainer);
