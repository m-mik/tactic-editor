import React, { Component } from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import classNames from 'classnames/bind';
import isEqual from 'lodash/isEqual';

import TileContainer from '../../containers/TileContainer';
import styles from './TeamGrid.scss';

const cx = classNames.bind(styles);

class TeamGrid extends Component {
  constructor() {
    super();

    this.handlePlayerTouchTap = this.handlePlayerTouchTap.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.players, nextProps.players)
      || this.props.options !== nextProps.options;
  }

  handlePlayerTouchTap(event, playerId) {
    event.preventDefault();
    if (this.props.activePlayerId !== playerId) {
      this.props.onPlayerSelect(playerId);
    }
  }

  render() {
    const {
      id,
      options,
      type,
      tilesCount,
      players,
      team,
      playerOptions,
      onPlayerMove,
      onPlayersSwap,
    } = this.props;

    const wrapperStyle = cx({
      wrapper: true,
      grid: options.showGrid,
    });

    const tiles = times(tilesCount).map((index) => {
      const position = type === 'home' ? index : (tilesCount - index - 1);
      const player = players[position];

      return (
        <TileContainer
          key={position}
          team={team}
          position={position}
          player={player}
          playerOptions={playerOptions}
          onPlayerTouchTap={this.handlePlayerTouchTap}
          onPlayerMove={onPlayerMove}
          onPlayersSwap={onPlayersSwap}
        />
      );
    });
    return (
      <div
        id={id}
        className={wrapperStyle}
        data-grid-type={type}
        onContextMenu={event => event.preventDefault()}
      >
        {tiles}
      </div>
    );
  }
}

TeamGrid.propTypes = {
  tilesCount: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  options: PropTypes.shape({
    showGrid: PropTypes.bool.isRequired,
  }).isRequired,
  activePlayerId: PropTypes.number.isRequired,
  players: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  team: PropTypes.shape({
    shirt: PropTypes.shape({
      border: PropTypes.object.isRequired,
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  playerOptions: PropTypes.shape({
    showAssists: PropTypes.bool.isRequired,
    showCards: PropTypes.bool.isRequired,
    showGoals: PropTypes.bool.isRequired,
    showName: PropTypes.bool.isRequired,
    showNumber: PropTypes.bool.isRequired,
    showRating: PropTypes.bool.isRequired,
  }).isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
};

export default TeamGrid;
