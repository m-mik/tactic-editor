import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import TeamGridList from '../../components/TeamGridList';
import PlayerPopover from '../../components/PlayerPopover';
import { findPlayerElement } from '../../lib/footballField/index';
import { selectEditedTeam, selectActivePlayer } from './selectors';
import { selectDenormalizedTeams } from '../../data/teams/selectors';
import { makeSelectTacticDetail } from '../../data/tacticDetails/selectors';
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


class TacticPage extends Component {
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
    return hasError && <span className={styles.errorMessage}>{message}</span>;
  }

  // todo
  // renderTeamInfo(index) {
  //   const { tactic } = this.props;
  //   const team = !tactic ? TeamInfo.defaultProps.team : tactic.teams[index];
  //   return (<TeamInfo
  //     onUpdate={this.props.updateTeam}
  //     onFormationChange={this.props.updateFormation}
  //     openEditTeamDialog={this.props.openEditTeamDialog}
  //     team={team}
  //   />);
  // }

  // renderFootballField() {
  //   const { tactic, isFetching } = this.props;
  //   return (
  //     <FootballField>
  //       {isFetching && <LoadingIndicator size={200} className={styles.loadingIndicator} />}
  //       {this.renderErrorMessage()}
  //       {tactic && tactic.teams.map((team, index) => (
  //         <TeamGrid
  //           key={team.id}
  //           type={index === 0 ? 'home' : 'away'}
  //           teamId={team.id}
  //         />
  //         ))}
  //     </FootballField>
  //   );
  // }

  renderPlayerPopover() {
    const { selectedPlayer, teams } = this.props;
    const anchorEl = selectedPlayer ? findPlayerElement(teams, selectedPlayer) : null;

    return (
      selectedPlayer && <PlayerPopover
        player={selectedPlayer}
        onPlayerChange={this.props.updatePlayer}
        anchorEl={anchorEl}
        onRequestClose={() => this.props.selectPlayer(0)}
      />
    );
  }
  //
  // renderTeamDialog() {
  //   return this.props.editedTeam && <EditTeamDialog
  //     onClose={this.props.closeEditTeamDialog}
  //     team={this.props.editedTeam}
  //     onConfirm={this.props.updateTeam}
  //   />;
  // }

// <TeamGridContainer
// key={team.id}
// type={index === 0 ? 'home' : 'away'}
// teamId={team.id}
// />
//
  render() {
    const { tacticDetail } = this.props;

    return (
      <section className={styles.wrapper}>
        {tacticDetail && <TeamGridList teamIds={tacticDetail.teams} />}

        {/* {this.renderTeamInfo(0)}*/}
        {/* {this.renderFootballField()}*/}
        {this.renderPlayerPopover()}
        {/* {this.renderTeamInfo(1)}*/}
        {/* {this.renderTeamDialog()}*/}
      </section>
    );
  }
}

TacticPage.defaultProps = {
  tactic: null,
  selectedPlayer: null,
  editedTeam: null,
};

TacticPage.propTypes = {
  // fetchTacticIfNeeded: PropTypes.func.isRequired,
  // selectPlayer: PropTypes.func.isRequired,
  // movePlayer: PropTypes.func.isRequired,
  // updateFormation: PropTypes.func.isRequired,
  // swapPlayers: PropTypes.func.isRequired,
  // updatePlayer: PropTypes.func.isRequired,
  // closeEditTeamDialog: PropTypes.func.isRequired,
  // openEditTeamDialog: PropTypes.func.isRequired,
  // updateTeam: PropTypes.func.isRequired,
  // isFetching: PropTypes.bool.isRequired,
  // hasError: PropTypes.bool.isRequired,
  // activePlayerId: PropTypes.number.isRequired,
  // tactic: PropTypes.shape({
  //   teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  // }),
  // editedTeam: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  // selectedPlayer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const makeMapStateToProps = () => {
  const selectTacticDetail = makeSelectTacticDetail();
  return state => ({
    tacticDetail: selectTacticDetail(state),
    selectedPlayer: selectActivePlayer(state),
    teams: selectDenormalizedTeams(state),
  });
};
//
// const mapStateToProps = (state) => {
//   const activeTacticId = state.app.activeTacticId;
//   //const activePlayerId = state.editor.activePlayerId;
//
//   return {
//     // isFetching: isFetchingSelector(state),
//     // hasError: hasErrorSelector(state),
//     // tactic: tacticDetailSelector(state),
//     // selectedPlayer: selectActivePlayer(state),
//     // editedTeam: selectEditedTeam(state),
//     // activePlayerId,
//     // activeTacticId,
//     tacticDetail: state.data.tacticDetails.byId[activeTacticId],
//   };
// };

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
