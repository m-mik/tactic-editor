import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TeamGridList from '../../components/TeamGridList';
import TeamInfoContainer from '../TeamInfoContainer';
import PlayerPopover from '../../components/PlayerPopover';
import BenchListContainer from '../BenchListContainer';
import LoadingIndicator from '../../components/LoadingIndicator';
import FootballField from '../../components/FootballField';
import EditTeamDialog from '../../components/EditTeamDialog';
import { findPlayerElement } from '../../lib/footballField/index';
import { selectActivePlayer, selectEditedTeam, selectPlayersToReplace } from './selectors';
import {
  makeSelectTacticDetail,
  selectHasError,
  selectIsFetching,
} from '../../data/tacticDetails/selectors';
import { selectDenormalizedTeams } from '../../data/teams/selectors';
import { fetchTacticIfNeeded } from '../../data/tacticDetails/actions';
import { updatePlayer } from '../../data/players/actions';
import { addSubstitution, removeSubstitution, updateTeam } from '../../data/teams/actions';
import {
  closeEditTeamDialog,
  movePlayer,
  openEditTeamDialog,
  selectPlayer,
  setPlayersToReplace,
  swapPlayers,
  updateFormation,
} from './actions';
import styles from './TacticPage.scss';
import pt from '../../propTypes';
import ReplacePlayerPopover from '../../components/ReplacePlayerPopover';

class TacticPage extends PureComponent {
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

  renderPlayerPopover() {
    const { selectedPlayer, denormalizedTeams } = this.props;
    const anchorEl = selectedPlayer ? findPlayerElement(denormalizedTeams, selectedPlayer) : null;

    return (
      selectedPlayer && <PlayerPopover
        player={selectedPlayer}
        onPlayerChange={this.props.updatePlayer}
        anchorEl={anchorEl}
        onRequestClose={() => this.props.selectPlayer(0)}
      />
    );
  }

  renderReplacePlayerPopover() {
    const { playersToReplace, denormalizedTeams } = this.props;
    if (!playersToReplace) return [];

    const anchorEl = playersToReplace
      ? findPlayerElement(denormalizedTeams, playersToReplace.p2)
      : null;

    return (
      <ReplacePlayerPopover
        anchorEl={anchorEl}
        onRequestClose={() => this.props.setPlayersToReplace(null)}
        players={playersToReplace}
        onPlayerSubstitute={this.props.addSubstitution}
        onPlayerSwap={this.props.swapPlayers}
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

  renderErrorMessage() {
    return <span className={styles.errorMessage}>Tactic does not exist</span>;
  }

  render() {
    const { tacticDetail, hasError, isFetching } = this.props;
    const teams = (tacticDetail && tacticDetail.teams) || [];

    return (
      <section className={styles.wrapper}>
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
          <TeamInfoContainer teamId={teams[0]} />
          <FootballField>
            {tacticDetail && <TeamGridList teamIds={tacticDetail.teams} />}
            {hasError && this.renderErrorMessage()}
            {isFetching && <LoadingIndicator className={styles.loadingIndicator} />}
          </FootballField>
          <TeamInfoContainer teamId={teams[1]} />
          {this.renderPlayerPopover()}
          {this.renderReplacePlayerPopover()}
          {this.renderTeamDialog()}
        </div>
        <div style={{ flex: 1 }}>
          <BenchListContainer />
        </div>
      </section>
    );
  }
}

TacticPage.defaultProps = {
  tacticDetail: null,
  selectedPlayer: null,
  playersToReplace: null,
  editedTeam: null,
  denormalizedTeams: null,
};

TacticPage.propTypes = {
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  setPlayersToReplace: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  swapPlayers: PropTypes.func.isRequired,
  addSubstitution: PropTypes.func.isRequired,
  removeSubstitution: PropTypes.func.isRequired,
  closeEditTeamDialog: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  tacticDetail: pt.tacticDetail,
  denormalizedTeams: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  editedTeam: pt.team,
  selectedPlayer: pt.player,
  playersToReplace: pt.playersToReplace,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const makeMapStateToProps = () => {
  const selectTacticDetail = makeSelectTacticDetail();
  return state => ({
    tacticDetail: selectTacticDetail(state),
    selectedPlayer: selectActivePlayer(state),
    playersToReplace: selectPlayersToReplace(state),
    editedTeam: selectEditedTeam(state),
    hasError: selectHasError(state),
    isFetching: selectIsFetching(state),
    denormalizedTeams: selectDenormalizedTeams(state),
  });
};

const ConnectedTacticPage = connect(
  makeMapStateToProps, {
    fetchTacticIfNeeded,
    movePlayer,
    swapPlayers,
    addSubstitution,
    removeSubstitution,
    setPlayersToReplace,
    selectPlayer,
    updatePlayer,
    updateTeam,
    openEditTeamDialog,
    closeEditTeamDialog,
    updateFormation,
  },
)(TacticPage);

export default withRouter(ConnectedTacticPage);
