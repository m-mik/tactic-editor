import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchTacticIfNeeded } from '../../entities/tacticDetails/actions';
import { updatePlayer } from '../../entities/players/actions';
import { updateTeam } from '../../entities/teams/actions';
import {
  movePlayer,
  swapPlayers,
  selectPlayer,
  closeEditTeamDialog,
  openEditTeamDialog,
} from './actions';
import TacticEditor from '../../components/TacticEditor';
import FootballField from '../../components/FootballField';
import TeamInfo from '../../components/TeamInfo';
import PlayerPopover from '../../components/PlayerPopover';
import EditTeamDialog from '../../components/EditTeamDialog';
import TeamGrid from './TeamGrid';
import {
  tacticDetailSelector,
  isFetchingSelector,
  hasErrorSelector,
} from '../../entities/tacticDetails/selectors';
import { editedTeamSelector, selectedPlayerSelector } from './selectors';
import { findPlayerElement } from '../../lib/footballField/index';

class TacticEditorPage extends Component {
  componentDidMount() {
    const id = +this.props.match.params.id;
    this.props.fetchTacticIfNeeded(id);
  }

  componentWillUpdate(nextProps) {
    const nextId = +nextProps.match.params.id;
    const currentId = +this.props.match.params.id;
    if (nextId !== currentId) {
      this.props.fetchTacticIfNeeded(nextId);
    }
  }

  renderErrorMessage() {
    const { hasError } = this.props;
    const message = 'Tactic does not exist';
    return hasError && <span className="error">{message}</span>;
  }

  renderTeamInfo(team) {
    return (<TeamInfo
      onUpdate={this.props.updateTeam}
      team={team}
      openEditTeamDialog={this.props.openEditTeamDialog}
    />);
  }

  render() {
    // TODO: Add LoadingIndicator
    const { isFetching, tactic, selectedPlayer } = this.props;
    if (isFetching) return <div>Fetching...</div>;
    if (!tactic) return <div>Waiting...</div>;

    const anchorEl = selectedPlayer ? findPlayerElement(tactic.teams, selectedPlayer) : null;

    return (
      <section>
        {this.renderErrorMessage()}
        <TacticEditor loading={isFetching} tactic={tactic}>
          {this.renderTeamInfo(tactic.teams[0])}
          <FootballField>
            {tactic.teams.map((team, index) => (
              <TeamGrid
                key={team.id}
                type={index === 0 ? 'home' : 'away'}
                team={team}
                onPlayerMove={this.props.movePlayer}
                onPlayersSwap={this.props.swapPlayers}
                onPlayerSelect={this.props.selectPlayer}
                selectedPlayerId={this.props.selectedPlayerId}
              />
            ))}
          </FootballField>
          {selectedPlayer && <PlayerPopover
            player={selectedPlayer}
            onPlayerChange={this.props.updatePlayer}
            anchorEl={anchorEl}
            onRequestClose={() => this.props.selectPlayer(0)}
          />}
          {this.renderTeamInfo(tactic.teams[1])}
          {this.props.editedTeam && <EditTeamDialog
            onClose={this.props.closeEditTeamDialog}
            team={this.props.editedTeam}
            onSubmit={() => console.log('submit')}
          />}
        </TacticEditor>
      </section>
    );
  }
}

TacticEditorPage.defaultProps = {
  tactic: null,
  selectedPlayer: null,
  editedTeam: null,
};

TacticEditorPage.propTypes = {
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  movePlayer: PropTypes.func.isRequired,
  swapPlayers: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  closeEditTeamDialog: PropTypes.func.isRequired,
  openEditTeamDialog: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  selectedPlayerId: PropTypes.number.isRequired,
  tactic: PropTypes.shape({
    teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  editedTeam: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  selectedPlayer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = (state) => {
  const selectedTacticId = state.app.selectedTacticId;
  const selectedPlayerId = state.editor.selectedPlayerId;

  return {
    isFetching: isFetchingSelector(state),
    hasError: hasErrorSelector(state),
    tactic: tacticDetailSelector(state),
    selectedPlayer: selectedPlayerSelector(state),
    editedTeam: editedTeamSelector(state),
    selectedPlayerId,
    selectedTacticId,
  };
};

const ConnectedTacticEditorPage = connect(
  mapStateToProps, {
    fetchTacticIfNeeded,
    movePlayer,
    swapPlayers,
    selectPlayer,
    updatePlayer,
    updateTeam,
    openEditTeamDialog,
    closeEditTeamDialog,
  },
)(TacticEditorPage);

export default withRouter(ConnectedTacticEditorPage);
