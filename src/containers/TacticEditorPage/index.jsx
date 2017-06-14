import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import TacticEditor from '../../components/TacticEditor';
import FootballField from '../../components/FootballField';
import TeamInfo from '../../components/TeamInfo';
import PlayerPopover from '../../components/PlayerPopover';
import EditTeamDialog from '../../components/EditTeamDialog';
import LoadingIndicator from '../../components/LoadingIndicator';
import TeamGrid from './TeamGrid';
import { findPlayerElement } from '../../lib/footballField/index';
import { editedTeamSelector, selectedPlayerSelector } from './selectors';
import { fetchTacticIfNeeded } from '../../data/tacticDetails/actions';
import { updatePlayer } from '../../data/players/actions';
import { updateTeam } from '../../data/teams/actions';
import {
  movePlayer,
  swapPlayers,
  selectPlayer,
  closeEditTeamDialog,
  openEditTeamDialog,
  updateFormation,
} from './actions';
import {
  tacticDetailSelector,
  isFetchingSelector,
  hasErrorSelector,
} from '../../data/tacticDetails/selectors';
import styles from './TacticEditorPage.scss';

class TacticEditorPage extends Component {
  componentDidMount() {
    const id = +this.props.match.params.id;
    this.props.fetchTacticIfNeeded(id);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
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
    return hasError && <span className={styles.errorMessage}>{message}</span>;
  }

  renderTeamInfo(index) {
    const { tactic } = this.props;
    const team = !tactic ? TeamInfo.defaultProps.team : tactic.teams[index];
    return (<TeamInfo
      onUpdate={this.props.updateTeam}
      onFormationChange={this.props.updateFormation}
      openEditTeamDialog={this.props.openEditTeamDialog}
      team={team}
    />);
  }

  renderFootballField() {
    const { tactic, isFetching } = this.props;
    return (
      <FootballField>
        {isFetching && <LoadingIndicator size={200} className={styles.loadingIndicator} />}
        {this.renderErrorMessage()}
        {tactic && tactic.teams.map((team, index) => (
          <TeamGrid
            key={team.id}
            type={index === 0 ? 'home' : 'away'}
            team={team}
            options={tactic.options}
            onPlayerMove={this.props.movePlayer}
            onPlayersSwap={this.props.swapPlayers}
            onPlayerSelect={this.props.selectPlayer}
            selectedPlayerId={this.props.selectedPlayerId}
          />
          ))}
      </FootballField>
    );
  }

  renderPlayerPopover() {
    const { selectedPlayer, tactic } = this.props;
    const anchorEl = selectedPlayer ? findPlayerElement(tactic.teams, selectedPlayer) : null;
    return (
      selectedPlayer && <PlayerPopover
        player={selectedPlayer}
        onPlayerChange={this.props.updatePlayer}
        anchorEl={anchorEl}
        onRequestClose={() => this.props.selectPlayer(0)}
      />
    );
  }

  renderTeamDialog() {
    return this.props.editedTeam && <EditTeamDialog
      onClose={this.props.closeEditTeamDialog}
      team={this.props.editedTeam}
      onConfirm={this.props.updateTeam}
    />;
  }

  render() {
    return (
      <section>
        <TacticEditor>
          {this.renderTeamInfo(0)}
          {this.renderFootballField()}
          {this.renderPlayerPopover()}
          {this.renderTeamInfo(1)}
          {this.renderTeamDialog()}
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
  updateFormation: PropTypes.func.isRequired,
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
    updateFormation,
  },
)(TacticEditorPage);

export default withRouter(ConnectedTacticEditorPage);
