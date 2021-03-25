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
import { selectEditedTeam, selectActivePlayer } from './selectors';
import {
  makeSelectTacticDetail,
  selectHasError,
  selectIsFetching,
} from '../../data/tacticDetails/selectors';
import { selectDenormalizedTeams } from '../../data/teams/selectors';
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
import styles from './TacticPage.scss';

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
  editedTeam: null,
  denormalizedTeams: null,
};

TacticPage.propTypes = {
  fetchTacticIfNeeded: PropTypes.func.isRequired,
  selectPlayer: PropTypes.func.isRequired,
  updatePlayer: PropTypes.func.isRequired,
  closeEditTeamDialog: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  tacticDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    options: PropTypes.object.isRequired,
    teams: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  denormalizedTeams: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  editedTeam: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  selectedPlayer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const makeMapStateToProps = () => {
  const selectTacticDetail = makeSelectTacticDetail();
  return state => ({
    tacticDetail: selectTacticDetail(state),
    selectedPlayer: selectActivePlayer(state),
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
    selectPlayer,
    updatePlayer,
    updateTeam,
    openEditTeamDialog,
    closeEditTeamDialog,
    updateFormation,
  },
)(TacticPage);

export default withRouter(ConnectedTacticPage);
