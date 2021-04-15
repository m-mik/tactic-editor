import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import TeamGridList from '../../components/TeamGridList';
import TeamInfoContainer from '../TeamInfoContainer';
import PlayerPopoverContainer from '../PlayerPopoverContainer';
import BenchListContainer from '../BenchListContainer';
import LoadingIndicator from '../../components/LoadingIndicator';
import FootballField from '../../components/FootballField';
import EditTeamDialog from '../../components/EditTeamDialog';
import { findPlayerElement, getTeamForPlayer, matchScore } from '../../lib/footballField/index';
import { selectActivePlayer, selectEditedTeam, selectPlayersToReplace } from './selectors';
import {
  makeSelectTacticDetail,
  makeSelectTacticDetailTeams,
  selectHasError,
  selectIsFetching,
} from '../../data/tacticDetails/selectors';
import { selectDenormalizedTeams } from '../../data/teams/selectors';
import { fetchTacticIfNeeded } from '../../data/tacticDetails/actions';

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
  static renderErrorMessage() {
    return <span className={styles.errorMessage}>Tactic does not exist</span>;
  }

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
    if (!selectedPlayer) return null;
    const anchorEl = findPlayerElement(denormalizedTeams, selectedPlayer);
    const team = getTeamForPlayer(denormalizedTeams, selectedPlayer);

    return (
      <PlayerPopoverContainer
        player={selectedPlayer}
        team={team}
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

  render() {
    const { teams, hasError, isFetching, tacticDetail } = this.props;

    const teamIds = get(tacticDetail, 'teams') || [];
    const showGoals = get(tacticDetail, 'options.showGoals');
    const goals = matchScore(...teams);

    return (
      <section className={styles.wrapper}>
        <div style={{ flex: 3, display: 'flex', flexDirection: 'column' }}>
          <TeamInfoContainer teamId={teamIds[0]} goals={goals[0]} showGoals={showGoals} />
          <FootballField>
            {teams.length && <TeamGridList teamIds={teamIds} />}
            {hasError && TacticPage.renderErrorMessage()}
            {isFetching && <LoadingIndicator className={styles.loadingIndicator} />}
          </FootballField>
          <TeamInfoContainer teamId={teamIds[1]} goals={goals[1]} showGoals={showGoals} />
          {this.renderPlayerPopover()}
          {this.renderReplacePlayerPopover()}
          {this.renderTeamDialog()}
        </div>
        <div style={{ flex: 1 }}>
          {teams.length && <BenchListContainer />}
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
  swapPlayers: PropTypes.func.isRequired,
  addSubstitution: PropTypes.func.isRequired,
  closeEditTeamDialog: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  denormalizedTeams: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  teams: pt.teams.isRequired,
  tacticDetail: pt.tacticDetail,
  editedTeam: pt.team,
  selectedPlayer: pt.player,
  playersToReplace: pt.playersToReplace,
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const makeMapStateToProps = () => {
  const selectTacticDetailTeams = makeSelectTacticDetailTeams();
  const selectTacticDetail = makeSelectTacticDetail();
  return (state, ownProps) => ({
    selectedPlayer: selectActivePlayer(state),
    playersToReplace: selectPlayersToReplace(state),
    editedTeam: selectEditedTeam(state),
    hasError: selectHasError(state),
    isFetching: selectIsFetching(state),
    denormalizedTeams: selectDenormalizedTeams(state),
    teams: selectTacticDetailTeams(state, ownProps),
    tacticDetail: selectTacticDetail(state, ownProps),
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
    updateTeam,
    openEditTeamDialog,
    closeEditTeamDialog,
    updateFormation,
  },
)(TacticPage);

export default withRouter(ConnectedTacticPage);
