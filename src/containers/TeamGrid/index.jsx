import React, { Component } from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import isEqual from 'lodash/isEqual';
import withDragDropContext from './withDragDropContext';
import Tile from './Tile';
import styles from './TeamGrid.scss';

class TeamGrid extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.team.players, nextProps.team.players);
  }

  renderTile(position, player, team) {
    const { onMovePlayer, onSwapPlayers } = this.props;
    return (<Tile
      key={position}
      position={position}
      player={player}
      team={team}
      onMovePlayer={onMovePlayer}
      onSwapPlayers={onSwapPlayers}
    />);
  }

  renderTiles() {
    const { team, tilesCount, type } = this.props;
    return times(tilesCount).map((index) => {
      const position = type === 'home' ? index : (tilesCount - index - 1);
      const player = team.players[position];
      return this.renderTile(position, player, team);
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTiles()}
      </div>
    );
  }
}

TeamGrid.propTypes = {
  team: PropTypes.shape({
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  tilesCount: PropTypes.number.isRequired,
  onMovePlayer: PropTypes.func.isRequired,
  onSwapPlayers: PropTypes.func.isRequired,
};

export default withDragDropContext(TeamGrid);
