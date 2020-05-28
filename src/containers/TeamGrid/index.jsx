import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import isEqual from 'lodash/isEqual';
import withDragDropContext from './withDragDropContext';
import { movePlayer, swapPlayers } from '../../entities/players/actions';
import PlayerTile from './PlayerTile';
import styles from './TeamGrid.scss';

class TeamGrid extends Component {
  constructor() {
    super();

    this.tilesCount = 36;
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.team.players, nextProps.team.players);
  }

  renderTile(position, player, team) {
    return (<PlayerTile
      key={position}
      position={position}
      team={{ id: team.id, shirt: team.shirt }}
      player={player}
      onPlayerMove={this.props.movePlayer}
      onPlayersSwap={this.props.swapPlayers}
    />);
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
    return (
      <div id={`team-grid-${this.props.team.id}`} className={styles.wrapper}>
        {this.renderTiles()}
      </div>
    );
  }
}

TeamGrid.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    players: PropTypes.object.isRequired,
    shirt: PropTypes.object.isRequired,
  }).isRequired,
  type: PropTypes.oneOf(['home', 'away']).isRequired,
  movePlayer: PropTypes.func.isRequired,
  swapPlayers: PropTypes.func.isRequired,
};

const ConnectedTeamGrid = connect(
  null,
  { movePlayer, swapPlayers },
)(TeamGrid);

export default withDragDropContext(ConnectedTeamGrid);
