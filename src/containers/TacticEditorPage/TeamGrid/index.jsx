import React, { Component } from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames/bind';
import withDragDropContext from './withDragDropContext';
import PlayerTile from './PlayerTile';
import { TEAM_GRID_ID_PREFIX, TILES_COUNT } from '../../../lib/footballField';
import styles from './TeamGrid.scss';

const cx = classNames.bind(styles);

class Grid extends Component {
  constructor() {
    super();

    this.tilesCount = TILES_COUNT;
    this.handleOnPlayerTouchTap = this.handleOnPlayerTouchTap.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedPlayerId !== nextProps.selectedPlayerId
      || !isEqual(this.props.options, nextProps.options)
      || !isEqual(this.props.team, nextProps.team);
  }

  handleOnPlayerTouchTap(event, id) {
    event.preventDefault();
    if (this.props.selectedPlayerId !== id) {
      this.props.onPlayerSelect(id);
    }
  }

  renderTile(position, player, team) {
    const { showRatings, showNumbers } = this.props.options;
    return (
      <PlayerTile
        key={position}
        position={position}
        team={{ id: team.id, shirt: team.shirt }}
        showRating={showRatings}
        showNumber={showNumbers}
        player={player}
        onPlayerMove={this.props.onPlayerMove}
        onPlayersSwap={this.props.onPlayersSwap}
        onPlayerTouchTap={this.handleOnPlayerTouchTap}
      />
    );
  }

  renderTiles() {
    const { team, type } = this.props;
    return times(this.tilesCount).map((index) => {
      const position = type === 'home' ? index : (this.tilesCount - index - 1);
      const player = team.players[position];
      return this.renderTile(position, player, team);
    });
  }

  render() {
    const { options } = this.props;
    const wrapperStyle = cx({
      wrapper: true,
      grid: options.showGrid,
    });

    return (
      <div
        id={`${TEAM_GRID_ID_PREFIX}-${this.props.team.id}`}
        className={wrapperStyle}
        data-grid-type={this.props.type}
        onContextMenu={event => event.preventDefault()}
      >
        {this.renderTiles()}
      </div>
    );
  }
}

Grid.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  options: PropTypes.shape({
    showGrid: PropTypes.bool.isRequired,
    showNumbers: PropTypes.bool.isRequired,
    showRatings: PropTypes.bool.isRequired,
  }).isRequired,
  selectedPlayerId: PropTypes.number.isRequired,
  onPlayerMove: PropTypes.func.isRequired,
  onPlayersSwap: PropTypes.func.isRequired,
  onPlayerSelect: PropTypes.func.isRequired,
};

export default withDragDropContext(Grid);
