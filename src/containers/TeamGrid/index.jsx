import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import isEqual from 'lodash/isEqual';
import withDragDropContext from './withDragDropContext';
import { movePlayer, swapPlayers } from '../../entities/players/actions';
import Tile from './Tile';
import DraggablePlayer from './DraggablePlayer';
import styles from './TeamGrid.scss';

class TeamGrid extends Component {
  constructor() {
    super();

    this.tilesCount = 36;
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.team.players, nextProps.team.players);
  }

  renderPlayer(player, team) {
    return (<DraggablePlayer
      team={{ id: team.id, shirt: team.shirt }}
      onMove={this.props.movePlayer}
      onSwap={this.props.swapPlayers}
      {...player}
    />);
  }

  renderTile(position, player, team) {
    return (<Tile
      key={position}
      position={position}
      team={{ id: team.id }}
    >
      {player && this.renderPlayer(player, team)}
    </Tile>);
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
