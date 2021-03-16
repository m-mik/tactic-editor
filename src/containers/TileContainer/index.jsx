import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames/bind';

import { makeSelectOptions } from '../../data/tacticDetails/selectors';
import { makeSelectTeamPlayers } from '../../data/players/selectors';
import { selectTeam } from '../../data/teams/selectors';
import DraggablePlayer from '../../containers/DraggablePlayer';
import ItemTypes from '../../lib/ItemTypes';
import { canDropPlayer } from '../../lib/footballField';
import { selectPlayer, movePlayer, swapPlayers } from '../TacticPage/actions';
import styles from '../../components/TeamGrid/TeamGrid.scss';
import { selectActivePlayerId } from '../TacticPage/selectors';

const cx = classNames.bind(styles);

class TileContainer extends Component {
  constructor() {
    super();

    this.handleOnPlayerTouchTap = this.handleOnPlayerTouchTap.bind(this);
  }

  handleOnPlayerTouchTap(event, id) {
    event.preventDefault();
    if (this.props.activePlayerId !== id) {
      this.props.onPlayerSelect(id);
    }
  }

  render() {
    const {
      connectDropTarget,
      position,
      isOver,
      canDrop,
      player,
      team,
      options,
    } = this.props;

    if (!team) return null;

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
          onTouchTap={this.handleOnPlayerTouchTap}
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
  player: null,
  team: null,
};

TileContainer.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  teamId: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    shirt: PropTypes.object.isRequired,
  }),
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
  options: PropTypes.shape({
    showGrid: PropTypes.bool.isRequired,
    showName: PropTypes.bool.isRequired,
    showNumbers: PropTypes.bool.isRequired,
    showRatings: PropTypes.bool.isRequired,
    showCards: PropTypes.bool.isRequired,
    showGoals: PropTypes.bool.isRequired,
    showAssists: PropTypes.bool.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
    cards: PropTypes.shape({
      yellow: PropTypes.number.isRequired,
      red: PropTypes.number.isRequired,
    }),
    goals: PropTypes.number.isRequired,
    assists: PropTypes.number.isRequired,
  }),
  activePlayerId: PropTypes.number.isRequired,
};

const makeMapStateToProps = () => {
  const selectOptions = makeSelectOptions();
  const selectTeamPlayers = makeSelectTeamPlayers();
  return (state, ownProps) => ({
    player: selectTeamPlayers(state, ownProps)[ownProps.position],
    team: selectTeam(state, ownProps),
    options: selectOptions(state),
    activePlayerId: selectActivePlayerId(state),
  });
};

const mapDispatchToProps = {
  onPlayerMove: movePlayer,
  onPlayersSwap: swapPlayers,
  onPlayerSelect: selectPlayer,
};

const DropTargetTileContainer = DropTarget(ItemTypes.PLAYER, tileTarget, collect)(TileContainer);

export default connect(makeMapStateToProps, mapDispatchToProps)(DropTargetTileContainer);
