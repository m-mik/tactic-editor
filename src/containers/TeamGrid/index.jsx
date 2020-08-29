import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import times from 'lodash/times';
import isEqual from 'lodash/isEqual';
import withDragDropContext from './withDragDropContext';
import { movePlayer, swapPlayers, selectPlayer } from '../TacticEditorPage/actions';
import PlayerTile from './PlayerTile';
import { TEAM_GRID_ID_PREFIX } from '../../services/footballField';
import styles from './TeamGrid.scss';

class TeamGrid extends Component {
  constructor() {
    super();

    this.tilesCount = 36;
    this.handleOnPlayerTouchTap = this.handleOnPlayerTouchTap.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.selectedPlayerId !== nextProps.selectedPlayerId
      || !isEqual(this.props.team.players, nextProps.team.players);
  }

  handleOnPlayerTouchTap(event, id) {
    event.preventDefault();
    if (this.props.selectedPlayerId !== id) {
      this.props.selectPlayer(id);
    }
  }

  renderTile(position, player, team) {
    return (<PlayerTile
      key={position}
      position={position}
      team={{ id: team.id, shirt: team.shirt }}
      player={player}
      onPlayerMove={this.props.movePlayer}
      onPlayersSwap={this.props.swapPlayers}
      onPlayerTouchTap={this.handleOnPlayerTouchTap}
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
      <div
        id={`${TEAM_GRID_ID_PREFIX}-${this.props.team.id}`}
        className={styles.wrapper}
        data-grid-type={this.props.type}
        onContextMenu={event => event.preventDefault()}
      >
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
  selectedPlayerId: PropTypes.number.isRequired,
  movePlayer: PropTypes.func.isRequired,
  swapPlayers: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedPlayerId: state.editor.selectedPlayerId,
});

const ConnectedTeamGrid = connect(
  mapStateToProps,
  { movePlayer, swapPlayers, selectPlayer },
)(TeamGrid);

export default withDragDropContext(ConnectedTeamGrid);
